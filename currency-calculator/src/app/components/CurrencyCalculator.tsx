'use client';

import { useState, useEffect } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: '美元', symbol: '$' },
  { code: 'EUR', name: '歐元', symbol: '€' },
  { code: 'GBP', name: '英鎊', symbol: '£' },
  { code: 'JPY', name: '日圓', symbol: '¥' },
  { code: 'CNY', name: '人民幣', symbol: '¥' },
  { code: 'TWD', name: '新台幣', symbol: 'NT$' },
  { code: 'KRW', name: '韓元', symbol: '₩' },
  { code: 'AUD', name: '澳幣', symbol: 'A$' },
  { code: 'CAD', name: '加幣', symbol: 'C$' },
  { code: 'SGD', name: '新加坡幣', symbol: 'S$' },
];

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('TWD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/exchange-rates');
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date().toLocaleString('zh-TW'));
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate conversion
  useEffect(() => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency] && amount) {
      const fromRate = fromCurrency === 'USD' ? 1 : exchangeRates[fromCurrency];
      const toRate = toCurrency === 'USD' ? 1 : exchangeRates[toCurrency];
      const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
      setResult(convertedAmount);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Initial load
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-TW', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(num);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(curr => curr.code === code)?.symbol || '';
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">匯率計算機</h1>
        <p className="text-gray-600">即時匯率換算工具</p>
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-2">
            最後更新: {lastUpdated}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">金額</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="輸入金額"
            min="0"
            step="0.01"
          />
        </div>

        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">來源貨幣</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapCurrencies}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
            title="交換貨幣"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">目標貨幣</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">計算中...</span>
            </div>
          ) : (
            <div>
              <p className="text-lg text-gray-700 mb-2">
                {getCurrencySymbol(fromCurrency)} {formatNumber(parseFloat(amount) || 0)} {fromCurrency} =
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {getCurrencySymbol(toCurrency)} {formatNumber(result)} {toCurrency}
              </p>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchExchangeRates}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{loading ? '更新中...' : '更新匯率'}</span>
        </button>
      </div>
    </div>
  );
}