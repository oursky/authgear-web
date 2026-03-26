# Authgear Design System
> 版本：2026-03-25 | 技術棧：React + Tailwind CSS v4 | 字體：IBM Plex Sans | 主題：Purple-Blue 深色宇宙

---

## 目錄 Table of Contents

1. [設計原則 Design Principles](#1-設計原則-design-principles)
2. [顏色系統 Color System](#2-顏色系統-color-system)
3. [漸層系統 Gradient System](#3-漸層系統-gradient-system)
4. [字體系統 Typography](#4-字體系統-typography)
5. [間距系統 Spacing](#5-間距系統-spacing)
6. [佈局密度 Layout Density](#6-佈局密度-layout-density)
7. [圓角系統 Border Radius](#7-圓角系統-border-radius)
8. [邊框規格 Borders](#8-邊框規格-borders)
9. [元件規格 Components](#9-元件規格-components)
10. [玻璃擬態 Glassmorphism](#10-玻璃擬態-glassmorphism)
11. [CSS Token 完整列表](#11-css-token-完整列表)

---

## 1. 設計原則 Design Principles

### 1.1 深色主導、淺色切換的雙主題交替結構

整體頁面以紫藍漸層（`rgb(8,23,118)` → `rgb(152,66,255)`）作為主要背景，佔 80% 以上版面。設計刻意在中段插入一個淺灰白（`#f5f5f5`）Section，形成「深-深-深-**淺**-深-深」的交替節奏，製造視覺上的呼吸感與故事轉折點。

| Section 角色 | 背景色 | 用途 |
|---|---|---|
| Hero Section | `linear-gradient(109.457deg, rgb(8,23,118) 0%, rgb(152,66,255) 101.99%)` | 主視覺區 |
| 主要 Section | `rgb(8, 23, 118)` (Base) | 功能介紹、CTA |
| 卡片 / 模組容器 | `rgba(28, 28, 28, 0.88)` | 獨立卡片底色 |
| 淺色插入 Section | `#f5f5f5` | 架構比較、微服務圖解 |
| Footer | 深色調 | 網站底部 |

> **規則**：淺色 Section 最多出現 **1 次**，起到敘事轉折作用，不可多次使用，避免破壞深色宇宙整體感。

### 1.2 漸層關鍵詞使用限制

- 同一 Section 的標題漸層關鍵詞限 **1 處**
- 深色背景：冰白→淡藍方向漸層
- 淺色背景：深藍→淡藍方向漸層
- 三色霓虹漸層保留給 CTA 按鈕等高強調場合

### 1.3 配色比例原則

**深色背景 70% ＋ 藍紫漸層容器 20% ＋ 文字亮色 10%**

---

## 2. 顏色系統 Color System

### 2.1 品牌色 Brand Colors（Persian Blue）

| Token | 值 | 用途 |
|---|---|---|
| `--ds-color-primary-50` | `#ECF6FF` | 品牌色 50（最淺） |
| `--ds-color-primary-100` | `#D4E9FF` | 品牌色 100 |
| `--ds-color-primary-200` | `#B2D9FF` | 品牌色 200 |
| `--ds-color-primary-300` | `#7DC3FF` | 品牌色 300 |
| `--ds-color-primary-400` | `#40A2FF` | 品牌色 400 |
| `--ds-color-primary-500` | `#147CFF` | 品牌色 500（中間調） |
| `--ds-color-primary-600` | `#0060FF` | 品牌色 600 |
| `--ds-color-primary-700` | `#0053FF` | 品牌色 700 |
| `--ds-color-primary-800` | `#0043E0` | **品牌主色**（最常用） |
| `--ds-color-primary-900` | `#0839A0` | 品牌色 900 |
| `--ds-color-primary-950` | `#0A2461` | 品牌色 950（最深） |

### 2.2 深色背景色 Dark Backgrounds（Purple-Blue Theme）

| Token | 值 | 用途 |
|---|---|---|
| `--ds-bg-deep` | `#111010` | 深層背景 |
| `--ds-bg-card` | `rgba(28, 28, 28, 0.88)` | 卡片底色 |
| `--ds-bg-card-hover` | `rgba(95, 101, 235, 0.15)` | 卡片 Hover 狀態 |
| — | `rgba(0, 0, 0, 0.33)` | 玻璃浮窗（產品截圖容器） |

### 2.3 淺色 Section 背景色 Light Section

| Token | 值 | 用途 |
|---|---|---|
| `--ds-bg-light` | `#f5f5f5` | 淺色 Section 背景 |
| `--ds-bg-light-card` | `#ffffff` | 白色卡片 |

### 2.4 文字色 Text Colours

| Token | 值 | 用途 |
|---|---|---|
| `--ds-text-primary` | `#ffffff` | 深色 Section 主要文字（最高層級） |
| `--ds-text-secondary` | `#afb7ff` | 深色 Section 次要文字 |
| `--ds-text-muted` | `rgba(175, 183, 255, 0.5)` | 深色 Section 弱化說明文字 |
| `--ds-text-light-primary` | `#2e2e2e` | 淺色 Section 主要標題文字 |
| `--ds-text-light-secondary` | `#626262` | 淺色 Section 正文描述文字 |
| `--ds-text-light-muted` | `#8e8e8e` | 淺色 Section 弱化說明文字 |

### 2.5 發光 / 光暈色 Glow Colours

| Token | 值 | 用途 |
|---|---|---|
| `--ds-glow-blue` | `rgba(11, 100, 233, 0.3)` | 藍色光暈 |
| `--ds-glow-purple` | `rgba(122, 46, 255, 0.3)` | 紫色光暈 |

---

## 3. 漸層系統 Gradient System

### 3.1 背景漸層 Background Gradients

| Token | 值 | 用途 |
|---|---|---|
| `--ds-gradient-hero` | `linear-gradient(109.457deg, rgb(8,23,118) 0%, rgb(152,66,255) 101.99%)` | Hero Section 主視覺背景 |
| `--ds-gradient-card` | `linear-gradient(to bottom, rgba(28,28,28,0.88), rgba(63,63,63,0.6))` | 功能卡片玻璃擬態背景 |
| `--ds-gradient-card-alt` | `linear-gradient(-42deg, rgba(157,161,255,0.8) 0%, rgba(95,101,235,0.8) 46%, rgba(0,9,103,0.8) 94%)` | 替代 / 強調卡片漸層 |

### 3.2 文字漸層 Text Gradients

| Token | 值 | 適用場合 |
|---|---|---|
| `--ds-gradient-text-dark` | `linear-gradient(to top, #ecf4ff 0.4%, #94beff 40.3%)` | 深色背景標題關鍵詞（主要用法） |
| `--ds-gradient-text-light` | `linear-gradient(0deg, rgb(2,86,202) 0.4%, rgb(185,212,255) 40.3%)` | 淺色切換 Section 標題關鍵詞 |

> 文字漸層實作方式：
> ```css
> background-image: var(--ds-gradient-text-dark);
> -webkit-background-clip: text;
> -webkit-text-fill-color: transparent;
> background-clip: text;
> ```

### 3.3 CTA 漸層 Accent / CTA Gradient

| Token | 值 | 用途 |
|---|---|---|
| `--ds-gradient-accent` | `linear-gradient(91.3155deg, rgb(57,28,233) 0.41044%, rgb(49,183,255) 99.673%)` | 主 CTA 按鈕（紫→青藍） |
| — | `linear-gradient(149deg, rgba(255,131,251,0.98) 0%, rgb(122,46,255) 50%, rgba(79,229,255,0.95) 100%)` | 三色霓虹（高強調場合保留） |

> ⚠️ CTA 漸層按鈕每畫面最多出現 1–2 個，避免視覺競爭。

### 3.4 圖示容器漸層 Icon Gradients

| Token | 值 | 外觀 |
|---|---|---|
| `--ds-gradient-icon-blue` | `linear-gradient(139.6deg, rgb(146,150,255) 0%, rgb(30,37,111) 100%)` | 藍紫色圖示容器 |
| `--ds-gradient-icon-green` | `linear-gradient(139.6deg, rgb(101,255,132) 0%, rgb(5,116,95) 100%)` | 綠色圖示容器 |
| `--ds-gradient-icon-purple` | `linear-gradient(139.6deg, rgb(37,164,255) 0%, rgb(88,0,147) 100%)` | 紫藍色圖示容器 |
| `--ds-gradient-icon-avatar` | `linear-gradient(135deg, #391CE9 0%, #31B7FF 100%)` | 用戶頭像容器（紫→青藍） |

---

## 4. 字體系統 Typography

### 4.1 字體

- **字族**：`IBM Plex Sans`（Google Fonts）
- **Token**：`--ds-font-family: 'IBM Plex Sans', sans-serif`
- **載入**：`/src/styles/fonts.css`
  ```css
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&display=swap');
  ```

### 4.2 字級與字重 Type Scale

全站統一使用 Regular (400)，H3 卡片標題使用 SemiBold (600)。

| 層級 | Token | 字級 | Line-Height | 字重 | 角色 |
|---|---|---|---|---|---|
| H1 | `--ds-text-h1` | `60px` | `72px` | Regular 400 | 頁面主標題 / Hero |
| H2 | `--ds-text-h2` | `40px` | `52px` | Regular 400 | 主要區塊標題 |
| H3 | `--ds-text-h3` | `24px` | `30px` | **SemiBold 600** | 卡片 / 功能標題 |
| H4 | `--ds-text-label` | `20px` | `28px` | Regular 400 | 標語 / 小節標題 |
| H5 | — | `18px` | `24px` | Regular 400 | 次要標籤 / 副標題 |
| H6 | — | `14px` | `20px` | Regular 400 | Caption / 輔助標籤 |
| Body | `--ds-text-body` | `18px` | `28px` | Regular 400 | 正文描述 |
| Body2 | — | `16px` | `24px` | Regular 400 | 次要內文 / 卡片描述文字 |

> **核心規則**：H1=60px、H2=40px、H3=24px (SemiBold) 構成基礎層級；用顏色的明暗與字級大小雙重降權表達層次；垂直漸層僅套用在每個 Section 最重要的關鍵詞上，最多 1 處。

### 4.3 深色 Section 文字顏色

| 層級 | 顏色 |
|---|---|
| H1（無漸層時） | `#ffffff` |
| H1 關鍵詞 | `linear-gradient(to top, #ecf4ff 0.4%, #94beff 40.3%)` |
| H2 | `#ffffff` |
| H3 | `#ffffff` |
| H4 | `#ffffff` |
| Body 正文 | `#afb7ff` |
| 次要說明 | `#cee9ff` |

### 4.4 淺色 Section 文字顏色

| 層級 | 顏色 |
|---|---|
| H1（無漸層時） | `#2e2e2e` |
| H1 關鍵詞 | `linear-gradient(0deg, rgb(2,86,202) 0.4%, rgb(185,212,255) 40.3%)` |
| H2 | `#2e2e2e` |
| H3 | `#2e2e2e` |
| Body 正文 | `#626262` |

---

## 5. 間距系統 Spacing

以 **8px** 為基礎單位，所有間距均為 8 的倍數。

| Token | 值 | 縮寫 | 用途 |
|---|---|---|---|
| `--ds-space-xxs` | `8px` | XXS | 卡片內部最小間距 |
| `--ds-space-xs` | `16px` | XS | 標題與描述文字 Gap |
| `--ds-space-s` | `24px` | S | 圖示與標籤、元素間 Gap |
| `--ds-space-m` | `32px` | M | 區塊模組之間 Gap |
| `--ds-space-l` | `64px` | L | 大型元件區塊 Padding |
| `--ds-space-xl` | `96px` | XL | 頁面 Section 上下 Padding |
| `--ds-space-xxl` | `128px` | XXL | 超大 Section 間距 / 全頁 Hero 留白 |

> 大量留白是設計語言的一部分，緊湊感集中在卡片「內部」，Section 與 Section 之間保持寬鬆。

---

## 6. 佈局密度 Layout Density

### 6.1 頁面容器 Page Container

頁面內容區最大寬度為 **1280px**，置中對齊，超出時左右保留 Desktop Padding。

| Token | 值 | 用途 |
|---|---|---|
| `--ds-layout-max-width` | `1280px` | 頁面最大寬度 |

### 6.2 斷點左右 Padding Breakpoint Padding

| 裝置 | Breakpoint | Max-Width | Padding X | Token |
|---|---|---|---|---|
| XL | ≥ 1280px | 1280px | `80px` | `--ds-layout-padding-xl` |
| LG | 1024px – 1279px | 1024px | `64px` | `--ds-layout-padding-lg` |
| MD | 768px – 1023px | 768px | `48px` | `--ds-layout-padding-md` |
| SM | < 768px | 100%（fluid） | `24px` | `--ds-layout-padding-sm` |

### 6.3 卡片內距 Card Padding

| Token | 值 | 適用卡片 |
|---|---|---|
| `--ds-layout-card-padding-lg` | `32px` | Feature Card、Stat Card |
| `--ds-layout-card-padding-sm` | `24px` | Compact Card、Icon Card |

### 6.4 卡片間距 Gutter

| Token | 值 | 用途 |
|---|---|---|
| `--ds-layout-card-gutter` | `24px` | 卡片網格 column / row gap |

> 卡片內距與 8px 間距系統保持一致：LG = `--ds-space-m`（32px），SM = `--ds-space-s`（24px）。

---

## 7. 圓角系統 Border Radius

所有圓角值均為 **8px 的倍數**，圓角大小與元件尺寸成正比。

| Token | 值 | 名稱 | 用途 |
|---|---|---|---|
| `--ds-radius-product` | `8px` | Product | 產品截圖卡片（模擬真實 UI 風格） |
| `--ds-radius-icon` | `16px` | Icon | 小型圖示背景容器 |
| `--ds-radius-card` | `24px` | Card | 主要功能卡片 / 特色區塊 |
| `--ds-radius-section` | `32px` | Section | 大型 Section 容器 / Hero 區塊 |
| `--ds-radius-pill` | `72px` | Pill | 超橢圓 / 完整圓形圖示、按鈕 |

---

## 8. 邊框規格 Borders

| Token | 值 | 用途 |
|---|---|---|
| `--ds-border-default` | `#8c8c8c` | 標準卡片邊框（1.5px） |
| `--ds-border-card` | `rgba(255, 255, 255, 0.63)` | 卡片半透明邊框 |
| `--ds-border-subtle` | `#1e256f` | 細微分隔線 |
| `--ds-border-light` | `#dce5ff` | 淺色主邊框 |
| `--ds-border-light-subtle` | `#edebe9` | 淺色細微分隔線 |

### 邊框使用規則

| 場合 | 規格 |
|---|---|
| 深色漸層卡片（標準） | `1.5px solid #8c8c8c` |
| 強調卡片（active / selected） | `1.5px solid #5e60b4` |
| 淺色 Section 白色卡片 | `0.5px solid #e0e0e0`（細膩分隔） |
| 細微邊框 | `1px solid #1e256f` |

---

## 9. 元件規格 Components

### 9.1 按鈕 Buttons

#### Primary CTA（漸層）—— 標準變體（附右箭頭）
```css
border-radius: 16px;                   /* --ds-radius-icon */
background: linear-gradient(91.3155deg, rgb(57,28,233) 0.41044%, rgb(49,183,255) 99.673%);
padding: 14px 32px;
gap: 8px;
font-size: 18px;
font-weight: 500;                      /* Medium */
color: #ffffff;
border: none;
line-height: 1.5;
```
- 尾端圖示：`<ArrowRight size={18} />`，hover 時向右位移 4px

#### Primary CTA with Icon —— 前置圖示變體
```css
/* 規格同上，差異如下 */
icon: <Sparkles size={18} />           /* 置於文字前方 */
```

> ⚠️ Primary 漸層按鈕每畫面最多出現 1–2 個，避免視覺競爭。

#### Secondary（白底藍字）—— 標準變體（附右箭頭）
```css
border-radius: 16px;                   /* --ds-radius-icon */
background: #ffffff;
padding: 14px 32px;
gap: 8px;
font-size: 18px;
font-weight: 500;                      /* Medium */
color: #0043E0;                        /* --ds-color-primary-800 */
border: none;
line-height: 1.5;
```
- 尾端圖示：`<ArrowRight size={18} style={{ color: "#0043E0" }} />`，hover 時向右位移 4px
- hover 效果：`opacity: 0.9`
- 適用場合：淺色背景或需要高對比的行動呼籲

#### Secondary（白底藍字）with Icon —— 前置圖示變體
```css
/* 規格同上，差異如下 */
icon: <Shield size={18} style={{ color: "#0043E0" }} />   /* 置於文字前方 */
```

#### Tertiary（透明底白字，無邊框）—— 標準變體（附右箭頭）
```css
border-radius: 16px;                   /* --ds-radius-icon */
background: transparent;
padding: 16px 32px;
gap: 8px;
font-size: 18px;
font-weight: 400;                      /* Regular */
color: #ffffff;
border: none;
line-height: 24px;
```
- 尾端圖示：`<ArrowRight size={18} />`，hover 時向右位移 4px
- hover 效果：`background: rgba(255,255,255,0.05)`
- 適用場合：深色背景，與 Primary 並排使用

#### Tertiary（透明底白字）with Icon —— 前置圖示變體
```css
/* 規格同上，差異如下 */
icon: <Shield size={18} />             /* 置於文字前方 */
```

#### Ghost（Text Only）
```css
border-radius: 16px;
background: transparent;
padding: 13px 24px;
gap: 6px;
font-size: 16px;
font-weight: 600;                      /* SemiBold */
color: #afb7ff;
border: none;
line-height: 1.5;
```
- 尾端圖示：`<ArrowRight size={15} style={{ color: "#afb7ff" }} />`

#### Icon CTA（前置圖示 + Accent 漸層）
```css
border-radius: 16px;
background: linear-gradient(91.3155deg, rgb(57,28,233) 0.41044%, rgb(49,183,255) 99.673%);
padding: 14px 32px;
gap: 10px;
font-size: 16px;
font-weight: 700;                      /* Bold */
color: #ffffff;
border: none;
line-height: 1.5;
```
- 前置圖示：`<Icon size={16} />`（透過 prop 傳入，預設 Sparkles）
- 適用場合：需要圖示強調且尺寸較緊湊的 CTA

#### 按鈕尺寸 Button Sizes

| 名稱 | Padding | Font Size | Font Weight |
|---|---|---|---|
| Large | `16px 40px` | `18px` | Medium 500 |
| Medium | `14px 32px` | `16px` | Medium 500 |
| Small | `10px 24px` | `14px` | Medium 500 |

> 尺寸按鈕統一使用 Medium (500) 字重，搭配主 CTA 漸層背景（`--ds-gradient-accent`）。

#### 漸層值更新（Accent Gradient）

```css
/* CTA / Primary Button 使用漸層 */
--ds-gradient-accent: linear-gradient(91.3155deg, rgb(57,28,233) 0.41044%, rgb(49,183,255) 99.673%);
```

#### 按鈕規格對照表

| 變體 | 圓角 | 背景 | 字級 | 字重 | 邊框 | 文字色 | 特徵 |
|---|---|---|---|---|---|---|---|
| Primary（標準） | `16px` | Accent 漸層 | `18px` | Medium 500 | 無 | `#ffffff` | 尾端 ArrowRight |
| Primary（Icon） | `16px` | Accent 漸層 | `18px` | Medium 500 | 無 | `#ffffff` | 前置 Sparkles |
| Secondary 白底（標準） | `16px` | `#ffffff` | `18px` | Medium 500 | 無 | `#0043E0` | 尾端 ArrowRight（藍色） |
| Secondary 白底（Icon） | `16px` | `#ffffff` | `18px` | Medium 500 | 無 | `#0043E0` | 前置 Shield（藍色） |
| Tertiary 透明底（標準） | `16px` | transparent | `18px` | Regular 400 | 無 | `#ffffff` | 尾端 ArrowRight |
| Tertiary 透明底（Icon） | `16px` | transparent | `18px` | Regular 400 | 無 | `#ffffff` | 前置 Shield |
| Ghost | `16px` | transparent | `16px` | SemiBold 600 | 無 | `#afb7ff` | 尾端 ArrowRight（#afb7ff） |
| Icon CTA | `16px` | Accent 漸層 | `16px` | Bold 700 | 無 | `#ffffff` | 前置 Icon |

---

### 9.2 卡片 Cards

#### Feature Card（玻璃漸層）
```css
border-radius: 24px;                   /* --ds-radius-card */
background: linear-gradient(178deg, rgba(95,101,235,0.8) 0%, rgba(0,9,103,0.8) 100%);
border: 1.5px solid #8c8c8c;
backdrop-filter: blur(12px);
padding: 32px;
gap: 24px;                             /* icon → content gap */
```
- 含 glow halo：`rgba(122,46,255,0.3)` blur 48px opacity 0.4，置於右上角

#### Compact Card
```css
border-radius: 20px;
background: rgba(28, 29, 60, 0.7);
border: 1.5px solid #5e60b4;
backdrop-filter: blur(10px);
padding: 24px;
gap: 16px;                             /* icon → text gap */
```

#### Stat Card
```css
border-radius: 24px;
background: linear-gradient(-42deg, rgba(157,161,255,0.8) 0%, rgba(95,101,235,0.8) 46%, rgba(0,9,103,0.8) 94%);
border: 1.5px solid #5e60b4;
backdrop-filter: blur(12px);
padding: 32px 24px;
```
- 數值文字使用三色霓虹漸層 clip：`font-size: 42px; font-weight: 700`

#### Light Section Card（淺色 Section 專用）
```css
border-radius: 24px;
background: #ffffff;
border: 0.5px solid #e0e0e0;
padding: 32px;
gap: 16px;
box-shadow: 0 2px 12px rgba(0,0,0,0.05);
```
- 圖示背景：`#e9efff`，圖示色：`#0b63e9`
- 標題：`#2e2e2e`，描述：`#626262`

---

### 9.3 圖示容器 Icon Container

```css
width: 60px;
height: 60px;
border-radius: 16px;                   /* --ds-radius-icon */
background: [icon-gradient];
```

圖示容器漸層選擇（依內容語意）：

| 名稱 | 漸層 |
|---|---|
| Blue | `linear-gradient(139.6deg, rgb(146,150,255) 0%, rgb(30,37,111) 100%)` |
| Green | `linear-gradient(139.6deg, rgb(101,255,132) 0%, rgb(5,116,95) 100%)` |
| Purple | `linear-gradient(139.6deg, rgb(37,164,255) 0%, rgb(88,0,147) 100%)` |

---

### 9.4 圖示容器擴展規格 Icon Container Extended

基於 `/src/app/components/design-system/Icons.tsx` 的完整規格。

#### 9.4.1 尺寸系統 Size Scale

| 尺寸 | Container | Icon Size | Border Radius | 用途 |
|---|---|---|---|---|
| **sm** | `24px` | `10px` | `8px` | 小型圖示、清單項目 |
| **md** | `48px` | `20px` | `16px` | 標準功能圖示（預設） |
| **lg** | `64px` | `26px` | `16px` | 大型 Hero 區圖示 |
| **pill** | `128px` | `52px` | `64px` | 超大橢圓圖示容器 |

#### 9.4.2 漸層變體 Gradient Variants

```typescript
const ICON_GRADIENTS = {
  blue:   "linear-gradient(140deg, rgb(146,150,255) 0%, rgb(30,37,111) 100%)",
  green:  "linear-gradient(140deg, rgb(101,255,132) 0%, rgb(5,116,95) 100%)",
  purple: "linear-gradient(140deg, rgb(37,164,255) 0%, rgb(88,0,147) 100%)",
};
```

#### 9.4.3 Glass Icon Container（玻璃圖示容器）

```css
width: 60px;
height: 60px;
border-radius: 16px;
background: rgba(0,0,0,0.3);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.15);
```

#### 9.4.4 Pill Icon Container（超橢圓圖示容器）

```css
width: 128px;
height: 128px;
border-radius: 64px;
background: [icon-gradient];
backdrop-filter: blur(4px);
border: 1px solid rgba(255,255,255,0.2);
display: flex;
align-items: center;
justify-content: center;
```

Icon size: `52px`，適用於 Hero Section 主視覺區或產品功能強調。

---

## 10. 玻璃擬態 Glassmorphism

### 10.1 四層空間結構

| 層次 | 描述 | 技術規格 |
|---|---|---|
| **背景層** | 深色頁面 + 低透明度光暈 | `opacity: 0.3`，`filter: blur(24px)` |
| **卡片層（中景）** | 半透明漸層卡片 | `rgba` 背景 + `backdrop-filter: blur(12px)` + 邊框 1.5px |
| **產品截圖浮窗** | 卡片內的深色玻璃 UI 元素 | `background: rgba(0,0,0,0.33)`，`backdrop-filter: blur(13.5px)`，`border-radius: 20px` |
| **前景** | 白色文字 + 圖示（不透明） | `color: #ffffff`，`opacity: 1` |

### 10.2 GlassCard 規格

```css
border-radius: 24px;
background: linear-gradient(178deg, rgba(95,101,235,0.8) 0%, rgba(0,9,103,0.8) 100%);
border: 1.5px solid #8c8c8c;
backdrop-filter: blur(12px);
padding: 32px;
```

### 10.3 ProductModal 浮窗規格

```css
border-radius: 20px;
background: rgba(0, 0, 0, 0.33);
backdrop-filter: blur(13.5px);
border: 1px solid rgba(255, 255, 255, 0.12);
padding: 20px;
gap: 10px;
```

### 10.4 Glow Blob 光暈規格

```css
border-radius: 50%;
background: [glow-color];        /* rgba(11,100,233,0.3) 或 rgba(122,46,255,0.3) */
filter: blur(60px);
opacity: 0.3–0.4;
position: absolute;
pointer-events: none;
```

---

## 11. CSS Token 完整列表

以下為 `/src/styles/theme.css` 中所有 `--ds-*` token：

```css
/* Brand Colors — Persian Blue */
--ds-color-primary-50:       #ECF6FF;
--ds-color-primary-100:      #D4E9FF;
--ds-color-primary-200:      #B2D9FF;
--ds-color-primary-300:      #7DC3FF;
--ds-color-primary-400:      #40A2FF;
--ds-color-primary-500:      #147CFF;
--ds-color-primary-600:      #0060FF;
--ds-color-primary-700:      #0053FF;
--ds-color-primary-800:      #0043E0;
--ds-color-primary-900:      #0839A0;
--ds-color-primary-950:      #0A2461;

/* Backgrounds — Dark mode (Purple-Blue Theme) */
--ds-bg-deep:                #111010;
--ds-bg-card:                rgba(28, 28, 28, 0.88);
--ds-bg-card-hover:          rgba(95, 101, 235, 0.15);

/* Backgrounds — Light section */
--ds-bg-light:               #f5f5f5;
--ds-bg-light-card:          #ffffff;

/* Gradients */
--ds-gradient-hero:          linear-gradient(109.457deg, rgb(8,23,118) 0%, rgb(152,66,255) 101.99%);
--ds-gradient-card:          linear-gradient(to bottom, rgba(28,28,28,0.88), rgba(63,63,63,0.6));
--ds-gradient-card-alt:      linear-gradient(-42deg, rgba(157,161,255,0.8) 0%, rgba(95,101,235,0.8) 46%, rgba(0,9,103,0.8) 94%);
--ds-gradient-text-dark:     linear-gradient(to top, #ecf4ff 0.4%, #94beff 40.3%);
--ds-gradient-text-light:    linear-gradient(0deg, rgb(2,86,202) 0.4%, rgb(185,212,255) 40.3%);
--ds-gradient-accent:        linear-gradient(91.3155deg, rgb(57,28,233) 0.41044%, rgb(49,183,255) 99.673%);
--ds-gradient-icon-blue:     linear-gradient(139.6deg, rgb(146,150,255) 0%, rgb(30,37,111) 100%);
--ds-gradient-icon-green:    linear-gradient(139.6deg, rgb(101,255,132) 0%, rgb(5,116,95) 100%);
--ds-gradient-icon-purple:   linear-gradient(139.6deg, rgb(37,164,255) 0%, rgb(88,0,147) 100%);
--ds-gradient-icon-avatar:   linear-gradient(135deg, #391CE9 0%, #31B7FF 100%);

/* Glow */
--ds-glow-blue:              rgba(11, 100, 233, 0.3);
--ds-glow-purple:            rgba(122, 46, 255, 0.3);

/* Text — Dark section */
--ds-text-primary:           #ffffff;
--ds-text-secondary:         #afb7ff;
--ds-text-muted:             rgba(175, 183, 255, 0.5);

/* Text — Light section */
--ds-text-light-primary:     #2e2e2e;
--ds-text-light-secondary:   #626262;
--ds-text-light-muted:       #8e8e8e;

/* Borders */
--ds-border-default:         #8c8c8c;
--ds-border-card:            rgba(255, 255, 255, 0.63);
--ds-border-subtle:          #1e256f;
--ds-border-light:           #dce5ff;
--ds-border-light-subtle:    #edebe9;

/* Border Radius (8px multiples) */
--ds-radius-product:         8px;
--ds-radius-icon:            16px;
--ds-radius-card:            24px;
--ds-radius-section:         32px;
--ds-radius-pill:            72px;

/* Spacing (8px grid) */
--ds-space-xxs:              8px;
--ds-space-xs:               16px;
--ds-space-s:                24px;
--ds-space-m:                32px;
--ds-space-l:                64px;
--ds-space-xl:               96px;
--ds-space-xxl:              128px;

/* Typography */
--ds-font-family:            'IBM Plex Sans', sans-serif;
--ds-text-h1:                60px;
--ds-text-h2:                40px;
--ds-text-h3:                24px;
--ds-text-hero:              42px;
--ds-text-card:              24px;
--ds-text-label:             20px;
--ds-text-body:              18px;
--ds-text-body2:             16px;

/* Layout Density */
--ds-layout-max-width:       1280px;
--ds-layout-padding-xl:      80px;
--ds-layout-padding-lg:      64px;
--ds-layout-padding-md:      48px;
--ds-layout-padding-sm:      24px;
--ds-layout-card-padding-lg: 32px;
--ds-layout-card-padding-sm: 24px;
--ds-layout-card-gutter:     24px;
```

---

*文件更新日期：2026-03-25 | 來源：Authgear 產品行銷首頁設計系統（UserManagement 頁面版本）*
