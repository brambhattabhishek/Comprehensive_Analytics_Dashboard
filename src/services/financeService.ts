
import { useQuery } from "@tanstack/react-query";

export interface StockQuote {
  symbol: string;
  open: number;
  high: number;
  low: number;
  price: number;
  volume: number;
  latestTradingDay: string;
  previousClose: number;
  change: number;
  changePercent: string;
  companyName: string;        // Added company name
  industry: string;           // Added industry
  marketCap: number;          // Added market cap
  peRatio: number;            // Added PE ratio
  yearHigh: number;           // Added 52-week high
  yearLow: number;            // Added 52-week low
}

export interface StockTimeSeriesEntry {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type TimeRange = '1d' | '1w' | '1m' | '3m' | '1y';

// Function to fetch stock quote data
export const fetchStockQuote = async (symbol: string): Promise<StockQuote> => {
  // Note: In production, you would use the actual Alpha Vantage API
  // For demo purposes, we'll use mock data to avoid API key/rate limit issues
  
  // Mock implementation based on stock symbol
  return getMockStockQuote(symbol);
};

// Function to fetch stock time series data
export const fetchStockTimeSeries = async (
  symbol: string,
  range: TimeRange
): Promise<StockTimeSeriesEntry[]> => {
  // Mock implementation based on stock symbol and time range
  return getMockTimeSeries(symbol, range);
};

// Custom hook to get stock quote data using react-query
export const useStockQuote = (symbol: string) => {
  return useQuery({
    queryKey: ["stockQuote", symbol],
    queryFn: () => fetchStockQuote(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 2, // 2 minutes instead of 5 for more frequent updates
  });
};

// Custom hook to get stock time series data using react-query
export const useStockTimeSeries = (symbol: string, range: TimeRange) => {
  return useQuery({
    queryKey: ["stockTimeSeries", symbol, range],
    queryFn: () => fetchStockTimeSeries(symbol, range),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 2, // 2 minutes instead of 5 for more frequent updates
  });
};

// Helper functions to generate mock data

// Mock company data for more realistic information
const companyData: Record<string, { name: string, industry: string }> = {
  "AAPL": { name: "Apple Inc.", industry: "Technology" },
  "MSFT": { name: "Microsoft Corporation", industry: "Technology" },
  "GOOGL": { name: "Alphabet Inc.", industry: "Technology" },
  "AMZN": { name: "Amazon.com Inc.", industry: "Consumer Cyclical" },
  "META": { name: "Meta Platforms Inc.", industry: "Technology" },
  "TSLA": { name: "Tesla Inc.", industry: "Automotive" },
  "NVDA": { name: "NVIDIA Corporation", industry: "Technology" },
  "JPM": { name: "JPMorgan Chase & Co.", industry: "Financial Services" },
  "V": { name: "Visa Inc.", industry: "Financial Services" },
  "JNJ": { name: "Johnson & Johnson", industry: "Healthcare" },
  "WMT": { name: "Walmart Inc.", industry: "Consumer Defensive" },
  "PG": { name: "Procter & Gamble Co.", industry: "Consumer Defensive" },
  "MA": { name: "Mastercard Inc.", industry: "Financial Services" },
  "UNH": { name: "UnitedHealth Group Inc.", industry: "Healthcare" },
  "HD": { name: "Home Depot Inc.", industry: "Consumer Cyclical" },
};

function getMockStockQuote(symbol: string): StockQuote {
  // Use the symbol to generate predictable "random" values
  const seed = symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1);
  const basePrice = (seed % 100) + 50; // Base price between 50 and 150
  
  const open = basePrice - (Math.random() * 5);
  const high = basePrice + (Math.random() * 10);
  const low = basePrice - (Math.random() * 10);
  const price = basePrice + (Math.random() * 5 - 2.5);
  const previousClose = open - (Math.random() * 3 - 1.5);
  const change = price - previousClose;
  const changePercent = ((change / previousClose) * 100).toFixed(2) + '%';
  
  // Get company info
  const company = companyData[symbol.toUpperCase()] || { 
    name: `${symbol.toUpperCase()} Corp`, 
    industry: "General" 
  };
  
  // Use seed to create more realistic values for additional data
  const marketCap = (basePrice * (seed * 10000000));
  const peRatio = 10 + (seed % 30);
  const yearHigh = high + (Math.random() * 20);
  const yearLow = low - (Math.random() * 15);
  
  return {
    symbol: symbol.toUpperCase(),
    open,
    high,
    low,
    price,
    volume: Math.floor(Math.random() * 10000000) + 1000000,
    latestTradingDay: new Date().toISOString().split('T')[0],
    previousClose,
    change,
    changePercent,
    companyName: company.name,
    industry: company.industry,
    marketCap,
    peRatio,
    yearHigh,
    yearLow
  };
}

function getMockTimeSeries(symbol: string, range: TimeRange): StockTimeSeriesEntry[] {
  const result: StockTimeSeriesEntry[] = [];
  const today = new Date();
  
  // Determine number of data points based on the range
  let days = 0;
  switch (range) {
    case '1d': days = 1; break;
    case '1w': days = 7; break;
    case '1m': days = 30; break;
    case '3m': days = 90; break;
    case '1y': days = 365; break;
  }
  
  // Use the symbol to generate predictable "random" values
  const seed = symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1);
  const basePrice = (seed % 100) + 50; // Base price between 50 and 150
  let lastPrice = basePrice;
  
  // Generate the time series data
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add some realistic price movement
    const change = (Math.random() - 0.5) * 5;
    lastPrice = Math.max(1, lastPrice + change);
    
    const open = lastPrice - (Math.random() * 2);
    const high = lastPrice + (Math.random() * 3);
    const low = Math.max(1, open - (Math.random() * 3));
    const close = lastPrice;
    
    result.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  return result;
}

// Function to search for stock symbols (mock implementation)
export const searchStocks = async (query: string): Promise<Array<{symbol: string, name: string, industry: string}>> => {
  if (!query || query.length < 2) return [];
  
  // Expanded mock data for popular stocks with industry information
  const stocks = Object.entries(companyData).map(([symbol, data]) => ({
    symbol,
    name: data.name,
    industry: data.industry
  }));
  
  // Filter stocks based on the query
  return stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase()) ||
    stock.industry.toLowerCase().includes(query.toLowerCase())
  );
};
