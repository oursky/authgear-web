---
title: "港鐵公司以 Authgear 簡化兼職招聘登入"
excerpt: "了解港鐵如何為主管整合 Azure AD，並為兼職應徵者導入 WhatsApp OTP——以更少的密碼問題、更快完成導入，提供安全且行動友善的驗證。"
customerName: "港鐵公司"
companyIndustry: "大眾運輸與營運"
companyLocation: 香港
companyLogo: ./logo.png
coverImage: ./cover.jpg
thumbnail: ./thumbnail.jpg
loginMethods:
  - 電子郵件
  - 無密碼／簡訊
technicalDetails:
  - 多因素驗證
metrics:
  - num: "80%"
    text: "採用 WhatsApp OTP 降低訊息成本"
  - num: "1800+"
    text: "員工已導入 Authgear Workforce Identity"
  - num: "90%"
    text: "填補值班職缺的時間顯著縮短"
publishedAt: 2025-11-28T18:51:18.660Z
canonicalUrl: "https://www.authgear.com/zh-hant/customer-stories/hongkong-mtr"
---

作為香港主要鐵路營運商，港鐵公司建立數位平台以簡化兼職站務人員的招聘與管理。平台需服務兩類對象——內部車站主管與外部應徵者，並與港鐵企業身分架構整合。透過 Authgear，港鐵推出雙軌驗證：主管使用 Azure AD、兼職使用者使用 WhatsApp OTP，在企業級安全下提供行動優先、低摩擦的體驗。

## 重點摘要

- **產業：** 大眾運輸與營運
- **使用者：** 內部車站主管與外部兼職應徵者
- **使用情境：** 人力招聘與排班管理存取
- **驗證方式：** 主管使用 Azure AD（SSO／MFA）；應徵者使用 **WhatsApp 一次性密碼**
- **成果：** 更快完成導入、更少密碼問題、合規且可擴充的存取

## 關於港鐵公司

港鐵公司營運香港大眾鐵路網及相關運輸服務，致力卓越營運，並以數位平台改善招聘、排班與前線人力管理。

## 挑戰

- **兩類使用者、同一平台：** 為內部主管與外部應徵者量身打造登入
- **兼職使用者易用：** 許多應徵者非技術背景且以行動為主
- **與企業一致：** 與 **Azure Active Directory** 及既有安全政策乾淨整合

## 解決方案

Authgear 提供**雙軌驗證**，平衡安全與簡便：

1. **角色型驗證**　依角色採用不同方式，在集中政策控管下兼顧兩類受眾的易用與安全。
1. **車站主管 Azure AD 整合**　主管以現有 **港鐵 Azure AD** 憑證登入，取得 **SSO**、**MFA** 與符合企業政策的帳戶生命週期管理。
1. **兼職使用者 WhatsApp OTP**　應徵者以 **WhatsApp 一次性密碼** 驗證，無需記憶複雜密碼，簡化行動存取。

## 成果：彈性登入、更低負擔、更高採用

- **主管端企業級安全：** Azure AD 與 MFA
- **應徵者端低摩擦、行動友善：** WhatsApp OTP
- **支援負擔更低：** 密碼重設與服務台工單減少
- **維持合規：** 與內部 IT 及資料保護標準一致
- **更快上線：** 務實、依角色設計的登入體驗迅速交付

## 為何選擇 Authgear

- **兩全其美：** 內部企業整合與應徵者端簡便驗證並存
- **標準化且可擴充：** OIDC／OAuth2 與彈性因子選項
- **行動優先體驗：** 針對輪班工作流程中快速、重複存取優化
- **營運掌控：** 集中政策與可稽核設定

## 功能亮點

- **Azure AD SSO 與 MFA** 內部主管
- **WhatsApp OTP** 外部兼職使用者
- **角色感知流程** 與集中政策管理
- **管理工具與 API** 簡化使用者生命週期
