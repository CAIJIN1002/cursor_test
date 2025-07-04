# 匯率計算機 (Currency Calculator)

一個使用 Next.js 開發的現代化匯率計算機，支援多國貨幣的即時匯率轉換。

## 功能特色

- 🌍 **多國貨幣支援**: 支援美元、歐元、英鎊、日圓、人民幣、新台幣、韓元、澳幣、加幣、新加坡幣
- ⚡ **即時匯率**: 從 ExchangeRate-API 獲取最新匯率資訊
- 🔄 **快速轉換**: 一鍵交換來源貨幣和目標貨幣
- 📱 **響應式設計**: 完美適配桌面、平板和手機
- 💎 **現代化 UI**: 使用 Tailwind CSS 設計的美觀介面
- 🔄 **自動更新**: 支援手動刷新匯率資訊

## 技術架構

- **Frontend**: Next.js 14 + React + TypeScript
- **樣式**: Tailwind CSS
- **API**: Next.js API Routes
- **匯率數據**: ExchangeRate-API (免費 API)
- **字體**: Geist Sans 和 Geist Mono

## 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式運行
```bash
npm run dev
```

### 建置生產版本
```bash
npm run build
npm start
```

## 專案結構

```
src/
├── app/
│   ├── api/
│   │   └── exchange-rates/
│   │       └── route.ts          # 匯率 API 路由
│   ├── components/
│   │   └── CurrencyCalculator.tsx # 主要計算機組件
│   ├── globals.css                # 全局樣式
│   ├── layout.tsx                 # 根布局
│   └── page.tsx                   # 首頁
```

## API 接口

### GET /api/exchange-rates

獲取當前匯率資訊

**回應格式:**
```json
{
  "success": true,
  "rates": {
    "USD": 1.0,
    "EUR": 0.85,
    "TWD": 28.5,
    ...
  },
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

## 支援的貨幣

| 貨幣代碼 | 貨幣名稱 | 符號 |
|---------|----------|------|
| USD     | 美元     | $    |
| EUR     | 歐元     | €    |
| GBP     | 英鎊     | £    |
| JPY     | 日圓     | ¥    |
| CNY     | 人民幣   | ¥    |
| TWD     | 新台幣   | NT$  |
| KRW     | 韓元     | ₩    |
| AUD     | 澳幣     | A$   |
| CAD     | 加幣     | C$   |
| SGD     | 新加坡幣 | S$   |

## 部署

本專案可以部署到任何支援 Next.js 的平台：

- **Vercel** (推薦)
- **Netlify**
- **AWS**
- **Google Cloud Platform**

### Vercel 部署
```bash
npm install -g vercel
vercel
```

## 開發說明

### 添加新貨幣

1. 在 `CurrencyCalculator.tsx` 的 `currencies` 陣列中添加新貨幣
2. 確保 API 支援該貨幣代碼

### 自定義樣式

所有樣式都使用 Tailwind CSS，可以在組件中直接修改 className。

### API 錯誤處理

當外部 API 不可用時，會自動使用預設的模擬匯率資料。

## 許可證

MIT License

## 貢獻

歡迎提交 Pull Request 或建議改進！

---

**注意**: 本專案使用免費的匯率 API，可能有使用限制。生產環境建議使用付費的專業匯率服務。
