
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { 
  useWeatherData, 
  getUserLocation, 
  GeoLocation, 
  searchCities, 
  City 
} from "@/services/weatherService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function WeatherWidget() {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [locationName, setLocationName] = useState("Loading location...");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: weatherData, isLoading, error, refetch } = useWeatherData(location);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const userLocation = await getUserLocation();
        setLocation(userLocation);
        setLocationName("Current Location");
      } catch (error) {
        console.error("Error getting user location:", error);
        toast.error("Using default location. Please search for your city.");
        // Use New York as default
        setLocation({ lat: 40.7128, lon: -74.0060 }); 
        setLocationName("New York");
      }
    };
    
    fetchLocation();
  }, []);

  useEffect(() => {
    const searchForCities = async () => {
      if (debouncedSearch.length >= 2) {
        try {
          const results = await searchCities(debouncedSearch);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error("Error searching cities:", error);
          toast.error("Failed to search cities. Please try again.");
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };
    
    searchForCities();
  }, [debouncedSearch]);

  const handleCitySelect = (city: City) => {
    setLocation({ lat: city.lat, lon: city.lon });
    setLocationName(`${city.name}, ${city.country}`);
    setSearchQuery("");
    setShowResults(false);
  };

  const handleSearchFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const formatForecastData = () => {
    if (!weatherData?.daily) return [];
    
    return weatherData.daily.slice(0, 7).map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temperature: Math.round(day.temp.day),
      min: Math.round(day.temp.min),
      max: Math.round(day.temp.max),
      humidity: day.humidity,
    }));
  };

  const handleRetry = () => {
    toast.info("Retrying weather data fetch...");
    if (location) {
      // Slightly modify the location to force a new request
      const newLocation = { 
        lat: location.lat + 0.0001,
        lon: location.lon 
      };
      setLocation(newLocation);
      refetch();
    }
  };

  const renderCurrentWeather = () => {
    if (!weatherData) return null;
    
    if (weatherData.current) {
      const current = weatherData.current;
      const weatherIcon = current.weather[0]?.icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      
      return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img 
              src={iconUrl} 
              alt={current.weather[0]?.description} 
              className="w-24 h-24"
            />
            <p className="text-lg capitalize">{current.weather[0]?.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="text-5xl font-bold mb-2">{Math.round(current.temp)}°C</div>
            <div className="text-muted-foreground">Feels like: {Math.round(current.feels_like)}°C</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Humidity</span>
                <span className="font-medium">{current.humidity}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Wind Speed</span>
                <span className="font-medium">{Math.round(current.wind_speed)} m/s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Pressure</span>
                <span className="font-medium">{current.pressure} hPa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">UV Index</span>
                <span className="font-medium">{current.uvi}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (weatherData.main) {
      const weather = weatherData.weather[0];
      const iconUrl = `https://openweathermap.org/img/wn/${weather?.icon}@2x.png`;
      
      return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img 
              src={iconUrl} 
              alt={weather?.description} 
              className="w-24 h-24"
            />
            <p className="text-lg capitalize">{weather?.description}</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="text-5xl font-bold mb-2">{Math.round(weatherData.main.temp)}°C</div>
            <div className="text-muted-foreground">Feels like: {Math.round(weatherData.main.feels_like)}°C</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Humidity</span>
                <span className="font-medium">{weatherData.main.humidity}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Wind Speed</span>
                <span className="font-medium">{Math.round(weatherData.wind.speed)} m/s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Pressure</span>
                <span className="font-medium">{weatherData.main.pressure} hPa</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Visibility</span>
                <span className="font-medium">{Math.round(weatherData.visibility / 1000)} km</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderForecast = () => {
    if (!weatherData?.daily || weatherData.daily.length === 0) {
      return null;
    }
    
    return (
      <>
        <h3 className="font-medium text-lg mb-4">7-Day Forecast</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formatForecastData()}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `${value}°C`}
              />
              <Tooltip 
                formatter={(value) => [`${value}°C`, 'Temperature']}
                labelFormatter={(label) => `${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorTemp)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-6">
          {weatherData.daily.slice(0, 7).map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const weatherIcon = day.weather[0]?.icon;
            const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
            
            return (
              <div 
                key={day.dt} 
                className={`flex flex-col items-center p-2 rounded-md ${index === 0 ? 'bg-primary/10' : 'hover:bg-muted'}`}
              >
                <div className="font-medium">{dayName}</div>
                <img src={iconUrl} alt={day.weather[0]?.description} className="w-10 h-10" />
                <div className="text-sm">
                  <span className="font-medium">{Math.round(day.temp.max)}° </span>
                  <span className="text-muted-foreground">{Math.round(day.temp.min)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Weather</CardTitle>
            <CardDescription>{locationName}</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <div className="flex">
              <Input
                placeholder="Search for a city..."
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
                {searchResults.map((city) => (
                  <div
                    key={city.id}
                    className="p-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.country}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-6">
            <div className="text-destructive text-center mb-4">
              Error loading weather data. Please try again.
            </div>
            <Button 
              onClick={handleRetry}
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            {renderCurrentWeather()}
            {renderForecast()}
          </>
        )}
      </CardContent>
    </Card>
  );
}
