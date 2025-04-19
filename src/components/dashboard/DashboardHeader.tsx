import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Settings, ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function DashboardHeader({ toggleTheme, isDarkMode }: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"...`);
      // Implement actual search functionality here
    }
    setSearchQuery("");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/'); 
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border/40 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 lg:gap-6">
          {!isMobile && (
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
              <div className="p-1 rounded-md bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
              </div>
              <span className="hidden sm:inline-block">Analytics Dashboard</span>
            </Link>
          )}
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-md mx-4">
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </form>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="relative"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div ref={notificationRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Notifications</h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <div className="p-4 border-b border-border hover:bg-muted/50">
                    <p className="font-medium">Weather alert</p>
                    <p className="text-sm text-muted-foreground">Rain expected in your area today.</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                  <div className="p-4 border-b border-border hover:bg-muted/50">
                    <p className="font-medium">Stock alert</p>
                    <p className="text-sm text-muted-foreground">AAPL increased by 2.5%</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                  <div className="p-4 hover:bg-muted/50">
                    <p className="font-medium">News update</p>
                    <p className="text-sm text-muted-foreground">5 new articles in Technology</p>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div ref={userMenuRef} className="relative">
            <Button
              variant="ghost"
              size="sm"
              aria-label="User menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:inline-block font-medium">
                  {user?.name || user?.email?.split('@')[0] || "User"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <p className="font-medium">{user?.name || "User Profile"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
                </div>
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start text-left" asChild>
                    <Link to="/dashboard/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
