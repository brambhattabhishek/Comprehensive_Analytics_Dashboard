import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { NewsWidget } from "@/components/dashboard/NewsWidget";
import { FinanceWidget } from "@/components/dashboard/FinanceWidget";
import { toast } from "sonner";

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
      toast.success("Light theme activated");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
      toast.success("Dark theme activated");
    }
  };

  const renderContent = () => {
    const path = location.pathname;

    switch (path) {
      case "/dashboard/weather":
        return (
          <div className="grid grid-cols-1 gap-6">
            <WeatherWidget />
          </div>
        );
      case "/dashboard/news":
        return (
          <div className="grid grid-cols-1 gap-6">
            <NewsWidget />
          </div>
        );
      case "/dashboard/finance":
        return (
          <div className="grid grid-cols-1 gap-6">
            <FinanceWidget />
          </div>
        );
      default: // Overview or /dashboard
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <WeatherWidget />
              <FinanceWidget />
              <NewsWidget />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="container mx-auto max-w-[1600px]">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {location.pathname === "/dashboard/weather" ? "Weather Dashboard" :
               location.pathname === "/dashboard/news" ? "News Feed" :
               location.pathname === "/dashboard/finance" ? "Financial Overview" :
               "Analytics Dashboard"}
            </h1>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
