# 購物網站專案

這個專案是一個購物網站，包括前台客戶的產品購買頁面以及後台的產品管理系統。專案使用了 Next.js 作為前端框架，並且以 .NET Core 作為後端 API 層來處理產品的 CRUD 操作（新增、讀取、更新、刪除）。

## 目錄
1. [使用技術與框架](#使用技術與框架)
2. [設計決策與原因](#設計決策與原因)
3. [圖片插入示例](#圖片插入示例)
4. [安裝與配置](#安裝與配置)

## 使用技術與框架

### 1. Next.js (React Framework)
- **用途**：負責渲染使用者介面並進行頁面導航。
- **使用技術**：
  - `useState` 和 `useEffect`：管理產品數據和生命週期。
  - `axios`：進行前後端 API 資料交換。
  - `next/image`：用來處理圖片顯示，提升加載效能。

### 2. Tailwind CSS
- **用途**：實現美觀、響應式設計。
- **使用優點**：透過簡單的 class 控制佈局和樣式，無需過多自訂 CSS。

### 3. .NET Core Web API
- **用途**：處理產品數據的 CRUD 操作。
- **技術細節**：
  - `Entity Framework Core`：與 SQL Server 進行資料庫交互，使用 C# 類別操作數據。
  - API 功能：提供多個端點，供前端進行數據操作（新增、修改、刪除、獲取產品資料）。

### 4. SQL Server
- **用途**：儲存產品數據（名稱、描述、價格、圖片等）。

### 5. CORS
- **用途**：允許前端應用與後端 API 通訊，解決跨域問題。

## 設計決策與原因

### 1. Next.js 作為前端框架
- 支持伺服器端渲染（SSR），增強 SEO 友好性。
- 靜態網站生成（SSG）提升網站效能。

### 2. .NET Core 作為後端框架
- 高效能且跨平台，結合 `Entity Framework Core` 提供高效資料存取。

### 3. Axios 處理 API 請求
- 流行的 HTTP 請求庫，支持 Promise，方便管理 API 請求與回應。

### 4. 圖片優化
- `next/image` 自動優化圖片載入，提升網頁效能，改善 LCP（最大內容繪製時間）。

### 5. 表單驗證
- 前端進行基礎驗證，後端確保數據安全性和完整性。

## 圖片展示

### 1. 前臺購買畫面
![前臺購買畫面](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E5%89%8D%E8%87%BA%E8%B3%BC%E8%B2%B7%E7%95%AB%E9%9D%A2.png)

### 2. 前臺按購買後畫面
![前臺按購買後畫面](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E5%89%8D%E8%87%BA%E6%8C%89%E8%B3%BC%E8%B2%B7%E5%BE%8C%E7%95%AB%E9%9D%A2.png)

### 3. 訂單提交成功
![訂單提交成功](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E8%A8%82%E5%96%AE%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F.png)

### 4. 後臺畫面
![後臺畫面](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E5%BE%8C%E8%87%BA%E7%95%AB%E9%9D%A2.png)

### 5. 後臺更新產品價格
![後臺更新產品價格](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E5%BE%8C%E8%87%BA%E6%9B%B4%E6%96%B0%E7%94%A2%E5%93%81%E5%83%B9%E6%A0%BC.png)

### 6. 後臺空的值
![後臺空的值](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E5%BE%8C%E8%87%BA%E7%A9%BA%E7%9A%84%E5%80%BC.png)

### 7. 不能為空
![不能為空](https://github.com/lanlan0214/Next.js-.Net-Core/blob/main/buy/app/assets/%E4%B8%8D%E8%83%BD%E7%82%BA%E7%A9%BA.png)
