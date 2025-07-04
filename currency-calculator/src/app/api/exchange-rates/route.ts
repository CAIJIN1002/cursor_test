import { NextResponse } from 'next/server';

// Mock exchange rates for development - in production, you'd use a real API
const mockExchangeRates = {
  'USD': 1.0,
  'EUR': 0.85,
  'GBP': 0.73,
  'JPY': 110.0,
  'CNY': 6.45,
  'TWD': 28.5,
  'KRW': 1180.0,
  'AUD': 1.35,
  'CAD': 1.25,
  'SGD': 1.35,
};

// Free API alternative - ExchangeRate-API
async function fetchRealExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    // Fallback to mock data if API fails
    return mockExchangeRates;
  }
}

export async function GET() {
  try {
    const rates = await fetchRealExchangeRates();
    
    return NextResponse.json({
      success: true,
      rates: rates,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Error:', error);
    
    // Return mock data as fallback
    return NextResponse.json({
      success: false,
      rates: mockExchangeRates,
      lastUpdated: new Date().toISOString(),
      error: 'Using fallback exchange rates'
    });
  }
}