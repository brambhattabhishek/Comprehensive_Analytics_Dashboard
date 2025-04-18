
import { useState, useEffect } from "react";
import { Search, ArrowUp, ArrowDown, Building, TrendingUp, BarChart4, Info } from "lucide-react";
import { useStockQuote, useStockTimeSeries, searchStocks, TimeRange } from "@/services/financeService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function FinanceWidget() {
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{symbol: string, name: string, industry: string}>>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { data: stockQuote, isLoading: isQuoteLoading } = useStockQuote(stockSymbol);
  const { data: timeSeriesData, isLoading: isTimeSeriesLoading } = useStockTimeSeries(stockSymbol, timeRange);
  
  // Search for stocks as the user types
  useEffect(() => {
    const searchForStocks = async () => {
      if (debouncedSearch.length >= 2) {
        const results = await searchStocks(debouncedSearch);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };
    
    searchForStocks();
  }, [debouncedSearch]);
  
  const handleStockSelect = (symbol: string) => {
    setStockSymbol(symbol);
    setSearchQuery("");
    setShowResults(false);
  };
  
  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };
  
  // Format price to 2 decimal places
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };
  
  // Format market cap in billions/millions
  const formatMarketCap = (cap: number) => {
    if (cap >= 1000000000000) {
      return `$${(cap / 1000000000000).toFixed(2)}T`;
    } else if (cap >= 1000000000) {
      return `$${(cap / 1000000000).toFixed(2)}B`;
    } else if (cap >= 1000000) {
      return `$${(cap / 1000000).toFixed(2)}M`;
    } else {
      return `$${formatNumber(cap)}`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-2xl">Finance</CardTitle>
            {stockQuote && (
              <div className="text-sm text-muted-foreground">
                {stockQuote.companyName} ({stockQuote.symbol})
              </div>
            )}
            <CardDescription>Stock market data and trends</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <div className="flex">
              <Input
                placeholder="Search for a stock..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full"
              />
              <Button variant="ghost" size="icon" className="absolute right-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-background border border-border rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
                {searchResults.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleStockSelect(stock.symbol)}
                  >
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                      <div className="text-xs px-2 py-0.5 bg-muted rounded-full">{stock.industry}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isQuoteLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : !stockQuote ? (
          <div className="text-center py-6 text-destructive">
            Error loading stock data. Please try again.
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-muted-foreground mb-1">Current Price</div>
                    <div className="text-3xl font-semibold">${formatPrice(stockQuote.price)}</div>
                    <div className={`flex items-center mt-1 text-sm ${stockQuote.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stockQuote.change >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {formatPrice(Math.abs(stockQuote.change))} ({stockQuote.changePercent})
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between bg-card rounded-lg border border-border p-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Open</div>
                      <div className="font-medium">${formatPrice(stockQuote.open)}</div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-muted-foreground">Previous Close</div>
                      <div className="font-medium">${formatPrice(stockQuote.previousClose)}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between bg-card rounded-lg border border-border p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">High</div>
                        <div className="font-medium">${formatPrice(stockQuote.high)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Low</div>
                        <div className="font-medium">${formatPrice(stockQuote.low)}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-muted-foreground">Volume</div>
                      <div className="font-medium">{formatNumber(stockQuote.volume)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mb-4">
                  <div className="flex space-x-2">
                    {(["1d", "1w", "1m", "3m", "1y"] as TimeRange[]).map(range => (
                      <Button
                        key={range}
                        variant={timeRange === range ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeRange(range)}
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="h-64">
                  {isTimeSeriesLoading ? (
                    <Skeleton className="h-full w-full" />
                  ) : timeSeriesData && timeSeriesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timeSeriesData.map(entry => ({
                          date: entry.date,
                          price: entry.close,
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => {
                            if (timeRange === "1d") {
                              return value.split(" ")[1];
                            }
                            if (timeRange === "1w" || timeRange === "1m") {
                              return value.slice(5);
                            }
                            return value;
                          }} 
                        />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          tickFormatter={(value) => `$${value}`} 
                        />
                        <Tooltip
                          formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No data available for the selected time range</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/3">
                <div className="bg-card rounded-lg border border-border p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Company Profile</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Company</div>
                      <div className="font-medium">{stockQuote.companyName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Industry</div>
                      <div className="font-medium">{stockQuote.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Symbol</div>
                      <div className="font-medium">{stockQuote.symbol}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart4 className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Key Statistics</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Market Cap</div>
                      <div className="font-medium">{formatMarketCap(stockQuote.marketCap)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">P/E Ratio</div>
                      <div className="font-medium">{stockQuote.peRatio.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">52 Week High</div>
                      <div className="font-medium">${formatPrice(stockQuote.yearHigh)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">52 Week Low</div>
                      <div className="font-medium">${formatPrice(stockQuote.yearLow)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
