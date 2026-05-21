---
title: "密碼學失敗完整指南（OWASP Top 10 A02）"
excerpt: "了解什麼是密碼學失敗、真實案例，以及 OWASP 建議的實作方式，保護傳輸中與靜態資料安全。"
coverImage: ./cover.webp
category: industry
featured: false
metaTitle: "密碼學失敗完整指南（OWASP Top 10 A02）"
metaDescription: "了解什麼是密碼學失敗、真實案例，以及 OWASP 建議的實作方式，保護傳輸中與靜態資料安全。"
publishedAt: 2025-09-09T09:46:02.181Z
updatedAt: 2026-02-12T02:33:54.718Z
draft: false
---

密碼學失敗（Cryptographic Failures）——前身為 **Sensitive Data Exposure**——在 <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/" target="_blank">OWASP Top 10（2021）中排名第 2</a>，至今仍是攻擊者最快把存取轉為實際衝擊的途徑之一。隨著 **OWASP Top 10（2025）即將更新**，這個主題只會更重要：多數資料外洩不是因為現代加密演算法被「破解」，而是來自 **缺失、薄弱或誤用的密碼學實作**。

本指南將拆解：什麼是密碼學失敗、為何它會導致真實世界事件、開發者最常見陷阱（從未啟用 TLS 到硬編碼 secrets 與弱雜湊），以及可落地的預防步驟。你可以現在就用它稽核系統，等 2025 名單上線時就已經超前。

## 什麼是密碼學失敗？

簡單說，**密碼學失敗** 指的是因為密碼學使用不當或缺失，導致敏感資料暴露。在 OWASP Top 10 – 2021 中，這個分類取代了 2017 的「Sensitive Data Exposure」，強調的是密碼學機制本身失效，而不只是資料已暴露的結果。凡是本該加密或安全儲存的資料，因為未加密、弱加密、或金鑰與秘密管理不善而變得脆弱，都可視為密碼學失敗。面對頻繁資料外洩與嚴格隱私法規，開發者必須對密碼、個資、金融資料等採取最高等級保護。密碼學失敗會讓攻擊者在傳輸中或儲存時取得敏感資料，破壞使用者信任，甚至引發法規責任。

**為何重要？** 正確密碼學往往是最後一道防線；即使其他控制被突破，也能阻止攻擊者讀取敏感資料。OWASP 之所以提升其優先級，是因為多數外洩並非加密演算法被攻破，而是根本沒加密或實作錯誤。換言之，多數「敏感資料暴露」都源自 *未正確使用密碼學*。理解此分類可幫助開發與安全團隊聚焦：在哪裡加密、如何加密、用哪些演算法與設定、如何安全管理金鑰與密碼。

## 密碼學失敗的常見成因

密碼學失敗形式很多。以下是最常導致敏感資料暴露的原因與弱點：

- **未加密（明文資料）：** 敏感資料以明文傳輸或儲存。例：應用程式用 HTTP 傳送個資／憑證，或資料庫未加密。資料會 **裸露在外**，只要被攔截流量或取得儲存體就可直接讀取。未對傳輸使用 TLS、未加密資料欄位，都會讓攻擊者輕易竊聽或偷檔案取得秘密。若敏感資料在傳輸與靜態任一處沒加密，暴露只是時間問題。
- **弱或淘汰演算法：** 使用過時或已破的演算法／協定也是常見失敗。MD5、SHA-1、DES 與 SSL 3.0、早期 TLS 都已知 **可被破解**<a href="https://www.indusface.com/blog/owasp-a02-cryptographic-failures/#:~:text=access%2C%20especially%20over%20unsecured%20networks,data%20at%20risk%20of%20compromise" target="_blank"></a>，卻仍常出現在舊系統。攻擊者可用暴力或密碼分析攻擊破解。像 MD5 或未加鹽 SHA-1 雜湊可被預先計算表快速還原，RC4、DES 也會被現代算力擊破。若仍依賴這些演算法，對有心攻擊者而言，密文幾乎等於明文。請一律使用現代標準（如 AES-256、SHA-256/3、TLS 1.2+）。
- **金鑰管理不良：** 加密安全性取決於金鑰與保護方式。非常常見的失敗是 secrets 管理錯誤，例如把加密金鑰或憑證硬寫在程式碼中、重複使用同把金鑰、不輪替、或明文放在可公開讀取的設定檔。若攻擊者找到硬編碼金鑰（如公開 GitHub repo 或 APK），就可解密資料或取得高權限。弱金鑰（短、可猜）與過期不汰換也同樣危險。正確做法：使用 vault/HSM 安全存放、最小化存取權、定期輪替與失效處理、絕不把秘密直接嵌入程式碼。
- **不安全隨機數產生：** 密碼學常需隨機數（金鑰、IV、nonce 等）。使用非密碼學等級隨機器（如許多語言的 `Math.random()`）或可預測熵源是 **嚴重漏洞**。若 IV 或 session token 可預測，攻擊者可能解密資料或偽造 token。也常見熵不足，或重複使用本該一次性的隨機值。例：在 CBC 模式重用同一 IV 會洩漏資訊。請一律使用平台提供的 CSPRNG 產生金鑰、IV、token，且不要重用 nonce。若用固定／可預測 seed 初始化 PRNG，也會讓隨機性失效。
- **TLS/SSL 設定錯誤：** 即便使用 HTTPS，傳輸加密仍可能因設定出錯而失敗。常見錯誤包括啟用弱協定／密碼套件、不驗證憑證、缺少重要安全標頭。例：若伺服器接受 **自簽或過期憑證**，攻擊者可用假憑證進行中間人攻擊。若支援 TLS 1.0 或弱套件，也可能遭降級攻擊與竊聽。未全面強制 HTTPS（例如缺 HSTS 或混合內容）同樣會暴露資料。密碼學失敗意味著「有加密技術」，卻沒有有效落地。
- **明文或弱雜湊密碼：** 明文儲存密碼當然是重大失敗；但雜湊方式錯誤也算密碼學失敗。常見錯誤是用快速且無鹽雜湊（如 MD5、SHA-1）存密碼。若資料庫外洩，攻擊者可用 rainbow table 或 GPU 極快 **破解弱雜湊**。例如 `password123` 的無鹽 SHA-1 可能數秒還原。正確做法是使用 **慢速、可調參數、含 salt 的演算法**，如 bcrypt、PBKDF2、Argon2。若沒做到，或更糟是明文存密碼，就是典型失敗。（另外，密碼不該用可逆加密，應使用不可逆雜湊。）
- **硬編碼憑證或秘密：** 這點非常常見，值得單獨強調。它與金鑰管理不良重疊，但範圍更廣，包含 API keys、tokens、帳密。這些 secrets 一旦透過程式碼庫、反編譯 app 等方式外洩，攻擊者可 **立即存取** 保護資源，不需破解任何演算法。例：行動 app 內硬編碼資料庫密碼或 API token，對逆向者是金礦。請務必外部化與保護 secrets，不要提交到版本控制。

上述每一項都代表未能透過密碼學 **有效保護資料**。好消息是：只要採取正確實務，全都可避免。

## 真實世界的密碼學失敗案例

要理解密碼學失敗的衝擊，來看幾個因加密實務不足或錯誤導致重大事件的案例：

### 1. RockYou2021 —— 大規模明文密碼外洩（2021）

2021 年出現史上最大密碼外洩之一 **RockYou2021**：駭客論壇公開了 **84 億組密碼**，全部是明文。這不是單一事故，而是多年多起外洩資料彙整，反映許多公司長期不當儲存密碼（未雜湊或弱雜湊被破解）。名稱呼應 2009 年 RockYou 事件（3,200 萬筆明文密碼），但規模更大。RockYou2021 反映的是跨組織、系統性的密碼儲存失敗——也就是由 *多方* 造成的密碼學失敗。若當初都採強雜湊與 salt，這個彙編就不會有利用價值。結果是數十億憑證以可讀形式外洩，風險波及無數使用者。這個案例清楚說明：密碼儲存若缺乏強密碼學保護，可能造成 *產業級* 災難。

### 2. Toyota GitHub 金鑰暴露（2022）

2022 年 Toyota 外包商發生一起典型「金鑰管理不良」事件：承包商 **誤把私密加密金鑰、access token 與其他秘密上傳到公開 GitHub repo**，且暴露一段時間。這些金鑰用於 Toyota 內部供應鏈系統。雖然 Toyota 表示未發現實際損害，但潛在衝擊非常大——攻擊者若取得這些金鑰，可能存取敏感內部資料或服務。這不是演算法被破解，而是 *秘密處理流程出錯*。它凸顯硬編碼與 secrets 管理失誤的風險。若有落實 secret vault 與 repo secret scanning，本可避免。Toyota 事件提醒所有開發者：**把金鑰與 token 當成高爆物管理**，絕不暴露於公開程式碼。

### 3. Facebook 內部系統明文密碼（2019）

2019 年初，Facebook 揭露其內部系統多年來以明文形式儲存 **數億使用者密碼**。這些密碼可被數千名員工存取，且未依業界標準做加密或雜湊。對 Facebook 這樣的大型技術公司而言，這是令人震驚的基礎錯誤。雖然 Facebook 宣稱未外流到公司外部，但這仍是重大密碼學失敗。它違反了「密碼應加鹽雜湊，連內部人員都不能讀」的基本原則。事件重創安全信任，也提醒業界：即使是內部 log 或系統，明文密碼都不可接受。若當時有惡意內部人員或外部攻擊者取得 log，即可直接拿到真實密碼。此案例再次證明：密碼強雜湊是不可妥協的底線，而且要確認 *每個* 處理憑證的環節都安全。

這些案例都顯示：密碼學失敗通常不是演算法被破解，而是組織一開始就 *沒把密碼學用對*。接下來看如何避免。

## 預防密碼學失敗的最佳實務

預防關鍵在於：**該加密的地方都做強加密，且妥善管理金鑰與資料**。以下做法可確保即使其他防線失守，敏感資料仍具機密性與保護力：

### 1. 對傳輸中與靜態敏感資料使用強加密

確保 **所有敏感資料都已加密**，包含網路傳輸與儲存。使用已驗證、現代化標準，而非自製或過時方案。資料 **傳輸中** 要全面使用 HTTPS（TLS），建議 TLS 1.2 或 1.3，停用所有不安全協定與套件（不要 HTTP、SSLv3、TLS 1.0/1.1）。啟用 HSTS 強制 HTTPS。資料 **靜態儲存** 方面，使用 AES-256 等強加密。現代資料庫與雲儲存通常支援 at-rest encryption，務必啟用，特別是密碼、個資、信用卡等欄位。**不要依賴弱加密或自創演算法。** 例如 XOR 或 Base64 不是加密，只是可輕易還原的編碼。透過成熟演算法與函式庫（並保持更新），可大幅降低資料被解密的風險。請記住：只要有一個敏感欄位或 API 端點漏掉，攻擊者就會鎖定那個弱點。

### 2. 建立安全金鑰管理

正確 **key management** 常是密碼學落地最脆弱的一環。原則是：金鑰與 secrets 的保護等級，至少要與其保護資料等同。**絕對不要把秘密或加密金鑰硬編碼進程式或設定檔**，也不要讓它們進版本控制。請使用安全存放方案：小型專案可用環境變數，規模化建議用 AWS KMS、Azure Key Vault、HashiCorp Vault 等。實作 **金鑰輪替政策**：不要永久使用同一把金鑰，定期輪替，疑似外洩時立即替換。金鑰需足夠長且隨機，避免人可記憶字串。限制誰能拿到解密金鑰（最小權限）。若做應用層加密，可考慮 **envelope encryption**（資料金鑰再由 master key 加密）；就算資料金鑰外洩，仍需 master key 才可使用。結論是：**金鑰管理失敗會讓最強演算法失效**。

### 3. 使用強密碼雜湊（絕不明文存密碼）

對使用者密碼（與 PIN 等）來說，絕不要明文儲存，也不要可逆加密。請用 **強健、可調參數、含唯一 salt 的雜湊**。2025 年建議演算法：**Argon2id**、**bcrypt**、**scrypt** 或高迭代 PBKDF2。這些函式刻意設計成慢且耗資源，可大幅提高攻擊者暴力破解成本。避免 MD5、SHA-1、無鹽 SHA-256 等快速舊演算法——以今日標準屬 **密碼學失敗**。也要確保每個密碼都有 salt（現代函式庫多會處理），即使兩位使用者密碼相同，雜湊也不同，能防 rainbow table。使用強雜湊後，即便密碼庫外洩，攻擊者也無法立即取得密碼，破解時間會長到不實際（理想上超過密碼生命週期）。例如 bcrypt cost 12 或 Argon2 相較單純 SHA-1，會大幅拖慢攻擊。**底線：安全儲存密碼是開發者最重要責任之一。**

### 4. 強制 TLS，保護傳輸中資料

僅「支援」 HTTPS 不夠，必須 **強制** 使用，避免降級與誤曝。設定應用與伺服器將所有 HTTP 重新導向 HTTPS。設定 HSTS 讓瀏覽器記住必須走 HTTPS。TLS 設定要扎實：使用可信 CA 憑證，**不得接受無效憑證**。應用需驗證憑證鏈與主機名稱。若是 API client 或行動 app，不要跳過驗證（可視需求採憑證釘選，但要妥善管理換證）。停用舊協定與弱套件，只允許強套件（如 AES-GCM、ChaCha20-Poly1305），優先 TLS 1.2/1.3。定期用工具（如 SSL Labs）檢查設定弱點。這可防止 **MITM 中間人攻擊**。常見失敗包括：未強制 HTTPS，讓攻擊者可 SSL stripping；未設定 Secure/HttpOnly cookie，導致 session 洩漏。請把未加密網路一律視為不可信。

### 5. 使用密碼學安全隨機數與安全協定實作

一個較隱性的重點是：**依設計方式正確使用密碼學**——使用安全函式庫，不要繞過保護。隨機數、IV、token、密碼都必須由平台 CSPRNG 產生。例：Python 用 `secrets.randbits` 或 `os.urandom`，不要 `random.random()`；Java 用 `SecureRandom`，不要 `java.util.Random`；JavaScript 用 Web Crypto API（如 `window.crypto.getRandomValues`）。不要自己寫 random generator，也不要用時間或 Math.random 作為 seed。加密模式也要正確：AES 建議用具驗證能力模式（AES-GCM、ChaCha20-Poly1305）以防密文被操弄；若用 CBC，每次都要新隨機 IV，且 **同一金鑰不可重用 IV**。不要隨意關閉 padding 檢查等機制，否則可能引入 padding oracle。總之，請用成熟函式庫（OpenSSL、BoringSSL、libsodium 等）並遵循官方建議；不要自作聰明簡化流程，這往往導致重大漏洞。也要持續更新函式庫版本。

### 6. 最小化敏感資料儲存與暴露面

避免密碼學失敗最直接的方法之一，是 **不要保留不必要敏感資料**。只蒐集、儲存真正需要的內容。資料不在系統裡，就不需加密，也不會被竊。OWASP 指南有句名言：*「不要不必要地儲存敏感資料……未保存的資料就無法被竊。」* 若因業務需要保存，可採 **tokenization** 或截斷。例如僅保存信用卡後 4 碼 + 支付商 token，而不是完整卡號。這樣即使資料庫外洩，攻擊者也拿不到完整卡資料。在系統中做資料 **分級**：辨識高敏感資料（個資、金融、健康、密碼、secrets），並採最高等級加密與存取控制。低敏感資料可視情況降低要求，但請審慎評估並符合隱私法規。也要 **清理不再需要資料**，建立保留與安全刪除政策。許多外洩被放大，正是因多年舊資料留存被一次偷走。實務上請關閉不必要個資日誌、避免在 URL 帶敏感資訊（容易進 log）、備份與匯出也要加密。

## 密碼學失敗防護檢查清單

要快速檢查系統對 OWASP A02 的防禦，請逐條確認（若任何一項是「否」，就需要修補）：

- **是否已加密所有敏感資料（傳輸中與靜態）？**（敏感資訊不應以明文傳輸／儲存）
- **是否使用強且現代的演算法與協定？**（例如資料用 AES-256、傳輸用 TLS 1.2+/HTTPS；不使用淘汰套件）
- **金鑰與 secrets 是否安全管理？**（在 vault/keystore，不在程式碼；具存取控管與輪替）
- **密碼是否以強雜湊 + salt 儲存？**（不用明文或弱雜湊；使用 bcrypt、Argon2 等）
- **是否強制 TLS 並驗證憑證？**（全面 HTTPS、HSTS、正式環境不接受自簽）
- **所有密碼學需求是否都使用安全隨機數？**（session ID、token、IV 皆由 CSPRNG 產生，不可預測）

若你能完整勾選，代表你已大幅降低落入 OWASP A02 密碼學失敗的風險。

## 結論與下一步

密碼學失敗仍是應用程式重大威脅，但只要理解成因並落實最佳實務，就能顯著降低被攻擊機率。請記住，攻擊者永遠找最弱環節——若你能 **一致地加密敏感資料並正確管理金鑰／密碼**，就等於先移除一大類容易利用的攻擊面。以上建議多數都直接對應 OWASP 建議，代表它們不是「可有可無」，而是必要安全衛生。

作為開發者或安全人員，也請持續更新知識。威脅與標準都在演進。關注 OWASP、NIST 等權威新指引，當演算法該淘汰（例如 SHA-1）或新漏洞出現（如加密函式庫漏洞）時，才能及時調整。建議導入定期 code review 與自動掃描，檢查硬編碼 secrets 與不當加密使用。越早修，成本越低。

最後，可考慮使用能 **分擔安全重工** 的平台與服務。例如 Authgear 提供現成驗證與使用者管理方案，內建資料加密、token 安全處理與密碼學最佳實務。與其自行重造輪子並承擔失誤風險，可交由成熟平台處理敏感資料合規與安全。

**開始使用 Authgear**——[免費試用](http://portal.authgear.com/) 或 [立即預約 Demo](/zh-hant/schedule-demo)——看看把強安全整合進你的應用有多容易。別等到外洩後才重視密碼學；現在就開始預防密碼學失敗，搶先一步面對威脅。你的資料值得最好的保護。

## FAQ：密碼學失敗（OWASP Top 10 A02）

**1) 什麼是密碼學失敗（OWASP A02）？**  
它是因為缺少、薄弱或誤用密碼學而造成的弱點，導致敏感資料暴露——例如沒用 TLS、使用淘汰演算法、金鑰管理不良或弱密碼雜湊。

**2) 這和「Sensitive Data Exposure」有何不同？**  
OWASP 改名是為了聚焦 *根本原因*。「Sensitive Data Exposure」描述結果；**Cryptographic Failures** 指的是導致結果的錯誤設定與不良實作。

**3) 哪些資料應該加密？**  
所有敏感資料：憑證、個資、token、金融／健康資訊、secrets、備份。請對 **傳輸中**（TLS）與 **靜態**（例如 AES-256）都加密，並避免在日誌記錄敏感資訊。

**4) 我該用（或避免）哪些演算法／協定？**  
建議：TLS 1.2/1.3；AES-GCM 或 ChaCha20-Poly1305；密碼用 Argon2id/bcrypt/PBKDF2；採用成熟函式庫（libsodium、OpenSSL）。  
避免：MD5、SHA-1、RC4、DES/3DES、自製密碼學、過時 SSL/TLS 版本。

**5) 使用者密碼該怎麼存？**  
絕不明文或可逆加密。請用 **加鹽的自適應雜湊**（Argon2id 或 bcrypt；PBKDF2 高迭代）。可選擇加 server-side pepper，且分離儲存。

**6) 常見密碼學錯誤有哪些？**  
硬編碼金鑰／secrets、可預測 PRNG、重用 IV/nonce、接受無效 TLS 憑證、HTTPS 頁面混合 HTTP 內容、未輪替金鑰。

**7) 如何安全管理金鑰與 secrets？**  
不要放在程式碼或行動 app。使用 **secrets manager/KMS**、最小權限、定期輪替、監控使用，並對程式碼庫啟用 secret scanning。

**8) 開發階段如何偵測密碼學失敗？**  
結合 SAST/DAST、依賴與 TLS 設定掃描、secret scanning、人工審查。並加入單元／整合測試驗證加密設定（如強制 TLS、拒絕弱套件）。

**9) 內部系統也一定要加密嗎？**  
若資料敏感就要。請假設內網與日誌在事件中也可能被存取。並實施 **資料最小化**——不蒐集／儲存不必要資料。

**10) Authgear 可以怎麼幫忙？**  
Authgear 集中提供安全驗證流程、強密碼雜湊、token 處理與 TLS-first 整合，能降低密碼學地雷，加速符合 OWASP 最佳實務。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a cryptographic failure (OWASP A02)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any weakness caused by missing, weak, or misused cryptography that exposes sensitive data—such as no TLS, outdated ciphers, poor key handling, or weak password hashing."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from “Sensitive Data Exposure”?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OWASP renamed the category to focus on root causes. “Sensitive Data Exposure” describes the outcome; Cryptographic Failures covers the misconfigurations and bad choices that lead to it."
      }
    },
    {
      "@type": "Question",
      "name": "What data should be encrypted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Encrypt credentials, personal data, tokens, financial/health info, secrets, and backups. Use TLS for data in transit and strong encryption (e.g., AES-256) for data at rest. Avoid logging sensitive data."
      }
    },
    {
      "@type": "Question",
      "name": "Which algorithms and protocols should I use (and avoid)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use TLS 1.2/1.3; AES-GCM or ChaCha20-Poly1305; Argon2id, bcrypt, or PBKDF2 for passwords; and modern, vetted libraries. Avoid MD5, SHA-1, RC4, DES/3DES, custom cryptography, and outdated SSL/TLS versions."
      }
    },
    {
      "@type": "Question",
      "name": "How should I store user passwords?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Never plaintext or reversible encryption. Store passwords as salted, adaptive hashes (Argon2id or bcrypt; PBKDF2 with high iterations). Optionally add a server-side pepper stored separately from the database."
      }
    },
    {
      "@type": "Question",
      "name": "What are common cryptographic mistakes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hard-coded keys/secrets, weak or non-cryptographic RNGs, IV/nonce reuse, accepting invalid TLS certificates, mixed content, failing to rotate keys, and leaving sensitive data in logs."
      }
    },
    {
      "@type": "Question",
      "name": "How do I handle keys and secrets safely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a secrets manager or KMS. Do not commit secrets to source code or mobile apps. Enforce least privilege, rotate regularly, monitor usage, and run automated secret-scanning on repositories."
      }
    },
    {
      "@type": "Question",
      "name": "How can I detect cryptographic failures during development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a mix of SAST/DAST, dependency and TLS configuration scanners, and secret-scanning. Add tests and code reviews that verify strong algorithms, TLS enforcement, and the absence of hard-coded secrets."
      }
    },
    {
      "@type": "Question",
      "name": "Do I always need encryption, even internally?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes for sensitive data. Treat internal networks and logs as potentially accessible during incidents. Minimize data collected and retained to reduce exposure and compliance risk."
      }
    },
    {
      "@type": "Question",
      "name": "How can Authgear help?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Authgear provides secure authentication, strong password hashing, token handling, and TLS-first integrations out of the box—reducing crypto mistakes and helping teams meet OWASP best practices faster."
      }
    }
  ]
}
</script>
