import CurrencyCalculator from './components/CurrencyCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            💱 匯率計算機
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            快速、準確的多國貨幣匯率換算工具，支援即時匯率更新
          </p>
        </div>

        {/* Currency Calculator */}
        <div className="flex justify-center">
          <CurrencyCalculator />
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">即時更新</h3>
            <p className="text-gray-600">獲取最新的匯率資訊，確保換算結果準確無誤</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">多國貨幣</h3>
            <p className="text-gray-600">支援美元、歐元、英鎊、日圓、人民幣、新台幣等主要貨幣</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">響應式設計</h3>
            <p className="text-gray-600">完美適配桌面、平板和手機等各種設備</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500">
          <p>© 2024 匯率計算機 - 使用 Next.js 開發</p>
        </footer>
      </div>
    </main>
  );
}
