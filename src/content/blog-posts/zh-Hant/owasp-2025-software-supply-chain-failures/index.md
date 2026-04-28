---
title: "OWASP Top 10 2025：A03—軟體供應鏈失敗"
h1: "OWASP Top 10 2025：A03—軟體供應鏈失敗（新手指南）"
excerpt: "了解 2025:A03 軟體供應鏈失敗代表什麼、攻擊如何發生，以及可落地的供應鏈安全檢查清單。"
coverImage: ./cover.jpg
category: industry
featured: false
metaTitle: "OWASP Top 10 2025：A03—軟體供應鏈失敗（新手指南）"
metaDescription: "了解 2025:A03 軟體供應鏈失敗代表什麼、攻擊如何發生，以及可落地的供應鏈安全檢查清單。"
publishedAt: 2025-11-12T16:37:01.972Z
updatedAt: 2026-02-12T02:35:14.209Z
draft: false
---

在 [OWASP Top 10 2025 候選版本](https://owasp.org/Top10/2025/0x00_2025-Introduction/) 中，A03:2025「Software Supply Chain Failures」排名第 3。它把 2021 年 A06「Vulnerable and Outdated Components」擴展到整條軟體生態鏈的風險，且在社群調查中是最高關注項之一。

軟體供應鏈失敗是指漏洞或竄改混入你信任的程式碼、工具或流程：像開源套件、建置系統、發布/更新通道。要降低風險，應先盤點軟體成分（SBOM）、強化 CI/CD、驗證來源與簽章、持續掃描依賴，並在管線全程落實最小權限。

## What is a software supply chain failure?

你的供應鏈包含第三方函式庫、套件 registry、CI/CD、artifact repository、container registry 與更新機制。任何環節被破壞或失效（惡意套件、維護者帳號被劫持、建置遭竄改、過時元件可被大量利用）都屬於供應鏈失敗。

## How these attacks happen

常見攻擊向量：

- **惡意或被劫持套件**：typosquatting、維護者帳號接管、熱門庫投毒更新。
- **CI/CD 遭入侵**：攻擊者取得建置系統或 secrets，將後門注入正式版本（如 SolarWinds）。
- **發佈通道遭竄改**：registry/更新伺服器受損，或 container image 被污染。
- **Dependency confusion/名稱衝突**：建置流程誤拉公有惡意套件而非內部套件。
- **脆弱與過時元件**：高風險 CVE（如 Log4j）可連鎖衝擊大量應用。

這些案例都顯示最弱的一環常在你自家程式碼之外，因此可視性與控制能力至關重要。

## Real-world examples

### 1) SolarWinds Orion：受信任更新變成後門（2020）

攻擊者入侵廠商建置環境，將後門植入已簽章的 Orion 更新，客戶在例行維護中安裝。這是大規模「信任濫用」典型案例。[U.S. CISA 警報](https://www.cisa.gov/news-events/alerts/2021/01/07/supply-chain-compromise)有完整說明。

### 2) Log4j / Log4Shell：普遍函式庫漏洞（2021）

CVE-2021-44228 讓 Log4j 2 可被輕易遠端執行程式碼。因 Log4j 被廣泛嵌入，全球團隊都必須快速盤點與修補。[CISA 指南](https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance)說明其影響。

### 3) XZ Utils 後門：長期滲透與維護者信任（2024）

[CVE-2024-3094](https://nvd.nist.gov/vuln/detail/cve-2024-3094) 將隱蔽後門放進上游版本。事件凸顯開源維護者風險與 artifact provenance 缺口。

### 4) 3CX DesktopApp：發佈階段被木馬化（2023）

Windows/macOS 安裝程式在被入侵的建置/發佈基礎設施中遭植入木馬。[U.S. CISA 分析](https://www.cisa.gov/news-events/alerts/2023/03/30/supply-chain-attack-against-3cxdesktopapp)展示其企業級衝擊。

### 5) Dependency confusion：拉到攻擊者套件（自 2021 以來）

[Alex Birsan 研究](https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610) 顯示，只要在公有 registry 發佈與企業內部同名套件，就可能誘導建置系統下載惡意版本。

## A practical starter checklist

1. 每次建置產生 SBOM，並隨 artifact 發佈，方便公告出現時即刻搜尋影響。
1. 持續 SCA（依賴掃描），高嚴重度議題阻擋建置，並自動 PR 安全升級。
1. 鎖定並驗證依賴（hash/簽章），避免使用 latest；容器使用 digest。
1. 實作 artifact 簽章與 provenance（如 Sigstore/cosign、in-toto），部署時驗證。
1. 強化 CI/CD：管理員 MFA、最小權限、保護分支/標籤、強制 code review、可稽核日誌、短生命 runner。
1. Secret hygiene：集中 vault、短期憑證、禁止 secrets 出現在 repo 或日誌。
1. Registry 治理：使用受控內部 mirror，隔離或封鎖可疑套件與映像。
1. 管線與設定變更控管：runner、secret、簽章政策變更需告警與審批。
1. 命名空間控制避免 dependency confusion：internal 套件加 scope，CI 強制 resolver 規則。
1. 演練事件回應：以 SBOM 快速定位資產、回滾或停用受損版本、協調對內外溝通。

## CI/CD hardening essentials

- **Identity & access**：MFA、RBAC 最小權限、職責分離。
- **Release integrity**：發佈分支要求簽章提交/標籤，僅 CI 可產生簽章且不可變 artifact。
- **Isolated builds**：ephemeral runner、乾淨工作區、限制敏感步驟外連。
- **Policy as code**：SAST/SCA/secret/license gate 失敗即阻擋。
- **Continuous monitoring**：追蹤維護者異常變更、突發套件釋出與 registry 公告，訂閱 CVE/NVD feed。

## Metrics that prove progress

- **Coverage**：產生 SBOM 的服務比例；具可驗 provenance 簽章的 artifact 比例。
- **Risk posture**：關鍵依賴 CVE 的 MTTR；入口即封鎖的高風險套件數。
- **Hygiene**：啟用保護 refs 的 repo 比例；強制 SCA/secret scan gate 的管線比例。
- **Response readiness**：模擬供應鏈事件時，完成曝險盤點所需時間。

持續追蹤指標，能清楚證明供應鏈安全正在進步。

## Conclusion: securing the links that hold everything together

軟體供應鏈失敗不是理論風險，而是當代最核心資安挑戰之一。OWASP 將 A03:2025 排到 Top 3，代表每行程式碼、每個依賴、每個建置步驟都屬於安全敘事。

重點很直接：看不見就保護不了；無法驗證就不該信任。透過 SBOM 建立可視性、以簽章與 provenance 建立可驗證信任、以 CI/CD 強化降低攻擊面，就能顯著降低成為下一個頭條事件的機率。

## Strengthen your identity and access layer with Authgear

供應鏈韌性不只在程式碼，也在於誰能存取你的系統。

使用 Authgear，你可透過安全登入流程、MFA、OIDC 與 WebAuthn 建立更強身份與授權基礎。
