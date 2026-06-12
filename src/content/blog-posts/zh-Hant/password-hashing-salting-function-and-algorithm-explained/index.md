---
title: "什麼是安全性加鹽及其運作原理？"
excerpt: "密碼加鹽是一種安全方法，它透過在對密碼進行雜湊處理之前向密碼添加唯一的隨機資料（“鹽”）來加強密碼保護。這確保了資料庫中儲存的每個密碼雜湊都是唯一的，從而有效防禦使用預計算表的攻擊，例如彩虹表攻擊。"
coverImage: ./cover.webp
category: engineering
featured: false
metaTitle: "什麼是安全加鹽？密碼雜湊和加鹽解釋"
metaDescription: "加鹽是在對密碼進行雜湊處理之前向密碼添加唯一的隨機資料（“鹽”）的做法，以確保不同的雜湊值，從而抵消彩虹表攻擊。"
publishedAt: 2022-02-24T02:51:02.195Z
updatedAt: 2026-03-11T15:50:48.875Z
draft: false
faq:
  - q: "Is salting the same as hashing?"
    a: "No. Hashing is a one-way transformation used to verify passwords without storing them in plain text. Salting adds a unique random value to each password before hashing so identical passwords produce different hashes."
  - q: "Do I still need a salt when using bcrypt?"
    a: "Modern bcrypt implementations generate and store a unique salt automatically with the hash. You don’t need to manage salts yourself, but understanding salting helps explain why rainbow-table attacks fail."
  - q: "What’s a pepper and where should I store it?"
    a: "A pepper is an application-wide secret used in addition to the per-user salt. Store it separately from the database, such as in a KMS or HSM or an environment secret, never alongside the hash."
  - q: "Which password hashing algorithm should I use in 2025?"
    a: "Prefer Argon2id for general use because it is memory-hard. Use PBKDF2 when FIPS or NIST compliance is required. Keep bcrypt only for legacy systems or where Argon2id is unavailable."
  - q: "What are safe Argon2id parameters?"
    a: "A reasonable starting point is roughly m ≈ 19–64 MiB, t = 1–3, p = 1. Tune to your production hardware so a single verification remains comfortably under about one second, and revisit settings periodically."
  - q: "Is SHA-256 or SHA-3 alone OK for passwords?"
    a: "No. General-purpose hashes are too fast for password storage. Use a dedicated password hashing or key-derivation function such as Argon2id, scrypt, bcrypt, or PBKDF2."
  - q: "How long should a salt be?"
    a: "Use a unique, random salt per password, typically 16–32 bytes (at least 128 bits) generated with a cryptographically secure random number generator."
  - q: "Where do I store the salt?"
    a: "Store the salt with the hash, for example in the same database row or encoded within the hash string. The salt is not secret and must be available during verification."
  - q: "What about the bcrypt 72-byte input limit?"
    a: "bcrypt only considers the first ~72 bytes of input. Enforce a maximum password length and/or migrate to Argon2id. If pre-hashing is unavoidable, use an HMAC with a server-side pepper and store the pepper separately."
  - q: "How do I migrate from bcrypt or PBKDF2 to Argon2id?"
    a: "Use opportunistic rehashing: verify existing users with the old algorithm, then on successful login rehash the password with Argon2id and update the stored record. Keep both verifiers during the transition."
  - q: "When should I rehash existing passwords?"
    a: "Rehash when your chosen algorithm or parameters are no longer sufficient—for example after raising Argon2id memory or time settings, or when migrating from bcrypt to Argon2id. Track a hash version per account."
  - q: "What’s the difference between password hashing and encryption?"
    a: "Hashing is one-way and designed for verifying passwords. Encryption is reversible and used for data you need to read back. Passwords should be hashed, not encrypted."
---

  
 
> 長話短說：
> 密碼加鹽是一種安全方法，透過在密碼雜湊處理之前向密碼添加唯一的隨機資料（「鹽」）來加強密碼保護。這確保了資料庫中儲存的每個密碼雜湊都是唯一的，從而有效防禦使用預計算表的攻擊，例如彩虹表攻擊。

<導航> 目錄
<ul>
<li style="margin-top:15px"><a href="#salting">什麼是安全性加鹽？ </a></li>
<li><a href="#how-does-salting-work">加鹽是如何運作的？ </a></li>
<li><a href="#how-does-salting-improve-password-security">加鹽如何提高密碼安全性？ </a></li>
<li><a href="#what-are-the-password-salting-best-practices">密碼加鹽最佳實踐是什麼？ </a></li>
</ul>
</導航>

<h2 id="salting">什麼是安全性加鹽？ </h2>

<!--圖-->
![](./figure-1.webp)
<!--/圖-->

安全性中的加鹽是在對每個使用者的密碼進行雜湊和儲存之前添加唯一的隨機資料（“鹽”）的做法。技術工作流程包括產生加密安全的隨機鹽，將其與用戶的輸入相結合，並對這對鹽進行雜湊處理以創建唯一的數位指紋以供將來驗證。此方法透過消除彩虹表攻擊、防止重複密碼共享相同的雜湊值以及迫使攻擊者單獨破解帳戶來提高安全性。為了實現穩健的實施，最佳實踐需要使用至少 16 位元組的獨特的每用戶鹽，並與現代演算法和深度防禦技術（如胡椒）相結合。

<h2 id="how-does-salting-work">加鹽是如何運作的？ </h2>

加鹽是一種安全技術，它在散列之前將唯一的隨機資料添加到密碼中，以確保每個儲存的憑證都具有唯一的數位指紋。

此技術工作流程有 5 個步驟：
**步驟 1：產生鹽**

**步驟 2：組合密碼和鹽**

**步驟 3：對組合字串進行雜湊處理**

**第 4 步：儲存鹽和哈希**

**第5步：使用者驗證**

### 第 1 步：生成鹽

使用加密安全隨機數產生器 (CSPRNG) 為每個使用者帳戶建立唯一的隨機字串。這確保了鹽是不可預測的並且在統計上是唯一的，從而防止攻擊者在不同使用者之間使用預先計算的資料。

### 步驟 2：組合密碼和鹽

透過在密碼前面或後面添加鹽字串，將隨機鹽與使用者的純文字密碼組合起來。即使密碼本身很常見，這種組合也會為雜湊函數建立唯一的輸入。

### 步驟 3：對組合字串進行雜湊處理

透過單向記憶體硬雜湊函數（例如 Argon2id、bcrypt 或 scrypt）處理組合的鹽密碼字串。這種轉換會產生一個固定長度的加鹽哈希，逆向或暴力破解的計算成本很高。您可以使用我們的[密碼雜湊產生器](/tools/password-hash-generator) 來了解不同的演算法如何處理此問題。

### 步驟 4：儲存鹽和雜湊值

將產生的加鹽雜湊和純文字鹽保存在使用者的資料庫記錄中。鹽不需要加密或隱藏。其主要功能是提供在將來的身份驗證嘗試期間重新產生相同雜湊所需的唯一金鑰。

### 步驟 5：使用者驗證

從資料庫中檢索儲存的鹽，將其與登入期間提供的密碼結合起來，並透過相同的雜湊演算法來運行該組合。如果新產生的雜湊值與資料庫中儲存的加鹽雜湊值匹配，則使用者通過驗證。

<h2 id="how-does-salting-improve-password-security">加鹽如何提升密碼安全性？ </h2>

加鹽透過在對每個密碼進行雜湊處理之前向每個密碼添加唯一的隨機資料來提高密碼安全性，從而防止攻擊者使用預先計算的表或在洩漏的資料庫中識別相同的憑證。該技術透過擊敗彩虹表攻擊、強制重複密碼使用唯一哈希、增加駭客的計算成本以及減輕字典和暴力攻擊來增強保護。

### 防止彩虹表攻擊

彩虹表是龐大的、預先計算的雜湊資料庫，包含數百萬個常用密碼，用於立即對被盜資料進行逆向工程。加鹽使這些表無效，因為攻擊者需要為資料庫中使用的每個特定鹽產生一個新的、唯一的彩虹表，這在計算上是不可能的。

### **減輕字典和暴力攻擊**

透過將隨機字串附加到使用者的輸入中，加鹽可確保即使是常見的字典單字也與其標準雜湊等效項不符。這可以確保用戶的憑證在自動字典或暴力嘗試期間不會顯示為“容易實現的目標”，從而保護密碼較弱的用戶。

### **保護重複密碼**

相同的密碼會產生相同的雜湊值，使攻擊者能夠立即識別共享通用密碼（例如「123456」）的每個使用者。加鹽可確保如果兩個使用者共用相同的密碼，則他們儲存的雜湊值完全不同，從而防止單一破解的密碼危及多個帳戶。

### **增加計算成本**

加鹽消除了駭客批量攻擊整個資料庫的能力。攻擊者不再對所有儲存的憑證進行單一攻擊，而是被迫單獨暴力破解每個帳戶，從而成倍增加破解資料所需的時間、處理能力和財務資源。

<h2 id="what-are-the-password-salting-best-practices">密碼加鹽最佳實踐是什麼？ </h2>

密碼加鹽最佳實踐需要為每個用戶產生一個獨特的、加密安全的隨機鹽，長度至少為 16 個位元組，並與雜湊密碼一起儲存。有效的實施包括使用獨特的每用戶鹽、確保足夠的鹽長度、利用現代哈希演算法、練習適當的存儲、避免可預測的值以及實施密碼胡椒以進行深度防禦。

### **獨特的每用戶鹽**

每個帳戶都必須在註冊或密碼變更期間產生自己獨特的鹽。切勿使用“站點範圍”或“靜態”鹽，因為這允許攻擊者對整個資料庫使用預先計算的表。獨特的鹽確保即使兩個用戶選擇相同的密碼，他們儲存的雜湊值也會完全不同。

### **足夠的長度**

鹽必須足夠長，以確保高熵並防止針對鹽本身的暴力攻擊。業界標準建議最小長度為 16 位元組（128 位元），通常與所使用的雜湊函數的輸出大小相符。

### **現代哈希演算法**

當與現代、緩慢且記憶體困難的雜湊演算法（例如 **Argon2id（建議）、bcrypt 或 scrypt**）配合使用時，加鹽最為有效。這些演算法旨在抵禦 GPU 和 ASIC 的高速破解嘗試，而 MD5 或 SHA-256 等快速雜湊值已不足以儲存密碼。

### **適當的存儲**

將鹽以純文字形式儲存在與密碼雜湊相同的資料庫表和行中。鹽不需要保密，它們的安全價值來自於唯一性和隨機性。將它們與雜湊一起儲存可確保應用程式在登入驗證過程中輕鬆檢索它們。

### **避免可預測的值**

切勿使用使用者名稱、電子郵件地址或其他靜態使用者資料作為鹽，因為攻擊者很容易猜到這些資料。始終使用 **加密安全偽隨機數產生器 (CSPRNG)** 來建立鹽，確保它們真正隨機且不可預測。

### **密碼外洩**

為了獲得額外的安全層，請實作密碼pepper，它是與資料庫分開儲存的金鑰（例如，在安全保管庫或環境變數中）。與鹽不同的是，胡椒粉不與哈希值一起存儲。如果資料庫遭到破壞，胡椒將提供最後一道防線，因為攻擊者缺乏驗證雜湊值所需的秘密值。

</頭>
<正文>
<表>
<標題>
<tr>
<th>功能</th>
<th>密碼鹽</th>
<th>密碼胡椒</th>
</tr>
</標題>
<正文>
<tr>
<td>儲存</td>
<td>資料庫（每用戶）</td>
<td>配置/保管庫（站點範圍）</td>
</tr>
<tr>
<td>獨特性</td>
<td>每個帳戶都是唯一的</td>
<td>所有帳戶的一個金鑰</td>
</tr>
<tr>
<td>安全目標</td>
<td>中和彩虹桌</td>
<td>保護資料庫是否外洩</td>
</tr>
</tbody>
</表>
</正文>
</html>

<div class="cta-v2">
<h2 class="title cta-split-content-left">Authgear 提升密碼安全性</h2>
<p class="cta-v2-paragraph">不再需要擔心密碼加鹽和雜湊處理</p>
<a href="/schedule-demo/" target="_blank" class="w-inline-block">
<div class="cta-v2-ctabtn button-primary">取得演示

<h2 id="article-cta-section">讓 Authgear 管理您的使用者密碼</h2>

借助 Authgear，您的使用者密碼將透過業界標準機制得到良好的保護。

Authgear 使用 Argon2id 對使用者密碼進行加鹽和雜湊處理。此外，您的應用程式還將配備您所需的所有安全功能，不僅可以提供更好的安全性，還可以提供更流暢的用戶體驗，從而獲得競爭優勢。

現在就[聯絡我們](/schedule-demo)，看看Authgear如何幫助您提高使用者轉換率、降低成本、提供更好的使用者體驗。

<script type="application/ld+json">
{
 "@context":"https://schema.org",
 "@type":"HowTo",
 "name":"How to hash a password",
 "step":[
  {"@type":"HowToStep","name":"Generate a unique salt","text":"Create a 16–32 byte CSPRNG salt."},
  {"@type":"HowToStep","name":"Hash the password","text":"Use Argon2id (or PBKDF2/bcrypt) with your salt and tuned parameters."},
  {"@type":"HowToStep","name":"Store hash and salt","text":"Save the hashed password plus salt and algorithm parameters."},
  {"@type":"HowToStep","name":"Verify on login","text":"Recompute the hash and compare."},
  {"@type":"HowToStep","name":"Rehash when needed","text":"If parameters are outdated, rehash with stronger settings."}
 ]
}
</script>

## 常見問題

## 加鹽與散列相同嗎？

不。 **雜湊**是一種單向轉換，用於驗證密碼而不將其儲存為純文字。 **加鹽** 在雜湊之前為每個密碼添加一個唯一的隨機值，因此相同的密碼會產生不同的雜湊。

### 使用 bcrypt 時還需要加鹽嗎？

現代 bcrypt 實作會自動產生並儲存唯一的鹽和雜湊值。您不需要自己管理鹽，但您應該了解為什麼鹽可以防止彩虹表攻擊。

### 什麼是「胡椒」？我應該將它存放在哪裡？

**pepper** 是除了每個使用者的鹽之外添加的應用程式範圍的秘密。將胡椒與資料庫分開儲存（例如，在 KMS/HSM 或環境機密中），切勿與雜湊一起儲存。

### 2025 年我應該使用哪種密碼雜湊演算法？

更喜歡 **Argon2id** 作為一般用途，因為它內存困難。當您必須符合 FIPS/NIST 要求時，請使用 **PBKDF2**。僅在舊系統或 Argon2id 不可用的情況下保留 **bcrypt**。

### 什麼是安全的 Argon2id 參數？

一個好的起點大致是 **m ≈ 19–64 MiB**，**t = 1–3**，**p = 1**。調整您的硬件，以便在生產設備上進行單次驗證的時間保持在約 1 秒以內，然後定期重新訪問。

### 密碼可以單獨使用 SHA-256 或 SHA-3 嗎？

不可以。通用哈希對於密碼存儲來說太快了。使用專用密碼雜湊/KDF 演算法，例如 **Argon2id**、**scrypt**、**bcrypt** 或 **PBKDF2**。

### 鹽應該要多長？

每個密碼使用唯一的隨機鹽，通常來自 CSPRNG 的 **16–32 位元組（≥128 位元）**。

### **我要儲存鹽巴？ **

將鹽與雜湊一起儲存（例如，在同一資料庫行中或在雜湊字串中編碼）。它不是秘密的，並且在驗證過程中必須可用。

### bcrypt 72 位元組輸入限制怎麼樣？

bcrypt 僅考慮輸入的前 72 個位元組。強制執行合理的最大長度和/或遷移到 **Argon2id**。如果必須預先哈希，請使用帶有伺服器端胡椒的 HMAC 並單獨儲存胡椒。

### 如何從 bcrypt/PBKDF2 遷移到 Argon2id？

使用**機會性重新雜湊**：使用舊演算法驗證現有用戶，然後在成功登入後，使用 Argon2id 重新雜湊密碼並更新儲存的記錄。在過渡期間保留兩個驗證者。

### 我什麼時候應該重新哈希現有密碼？

當您的演算法選擇或參數不再被認為足夠時（例如，在提高 Argon2id 記憶體/時間設定或從 bcrypt 移動到 Argon2id 後），請重新雜湊。追蹤每個帳戶的「哈希版本」。

### 密碼雜湊和加密有什麼差別？

**雜湊**是單向的，專為驗證而設計。 **加密**是可逆的，適用於您必須讀回的資料。密碼應該被散列，而不是加密。

