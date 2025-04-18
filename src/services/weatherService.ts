import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Define GeoLocation interface
export interface GeoLocation {
  lat: number;
  lon: number;
}

// Define City interface
export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// Extended WeatherData interface to include current and forecast data
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  // Additional properties for forecast data
  current?: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    pressure: number;
    uvi: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
  daily?: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    humidity: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  }>;
}

// Using the working API key provided
const API_KEY = "c0e2211f475bad6371c115604ceb431c";

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Weather API Error:", errorData);
      throw new Error(`Failed to fetch weather data: ${errorData.message || 'Unknown error'}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Weather API Error:", error);
    toast.error("Unable to fetch weather data. Please try again.");
    throw error;
  }
};

// Function to fetch weather data using coordinates
export const fetchWeatherByCoords = async (location: GeoLocation): Promise<WeatherData> => {
  try {
    // Use the weather API endpoint that works
    const weatherAPI_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`;
    const weatherResponse = await fetch(weatherAPI_URL);
    
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      console.error("Weather API Error:", errorData);
      throw new Error(`Failed to fetch weather data: ${errorData.message || 'Unknown error'}`);
    }
    
    return weatherResponse.json();
  } catch (error) {
    console.error("Weather API Error:", error);
    toast.error("Unable to fetch weather data. Please try again.");
    throw error;
  }
};

// Function to get user's current location
export const getUserLocation = (): Promise<GeoLocation> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          reject(new Error("Unable to retrieve your location"));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by your browser"));
    }
  });
};

// Function to search for cities
export const searchCities = async (query: string): Promise<City[]> => {
  if (query.length < 2) return [];
  
  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("City search error:", errorData);
      throw new Error(`Failed to search cities: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data.map((city: any, index: number) => ({
      id: index,
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }));
  } catch (error) {
    console.error("City search error:", error);
    toast.error("Unable to search cities. Please try again.");
    return [];
  }
};

export const useWeatherData = (location: GeoLocation | string | null) => {
  return useQuery({
    queryKey: ["weather", location],
    queryFn: async () => {
      if (!location) {
        return Promise.reject(new Error("No location provided"));
      }
      
      if (typeof location === 'string') {
        return fetchWeatherData(location);
      } else {
        return fetchWeatherByCoords(location);
      }
    },
    staleTime: 1000 * 60 * 2, // 2 minutes instead of 5
    refetchInterval: 1000 * 60 * 5, // 5 minutes instead of 15
    retry: 1,
    enabled: !!location
  });
};

// Function to convert temperature from Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

// Function to get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
