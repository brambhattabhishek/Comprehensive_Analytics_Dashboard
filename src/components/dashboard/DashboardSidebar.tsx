
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Cloud, 
  Newspaper, 
  LineChart, 
  Settings, 
  HelpCircle, 
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

function NavItem({ icon, title, href, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
}

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // On mobile, sidebar should start collapsed
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  // Close mobile menu when navigating
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle button (shown only on mobile)
  const MobileMenuButton = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden fixed top-4 left-4 z-50"
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      aria-label="Toggle mobile menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        
        {/* Mobile sidebar (slide in from left) */}
        <div className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div 
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-[240px] bg-background shadow-lg border-r border-border/40 transform transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <div className="p-4 flex justify-between items-center border-b border-border/40">
              <div className="flex items-center gap-2 font-semibold">
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
                <span>Dashboard</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto py-2 px-2">
              <nav className="grid gap-1">
                <NavItem 
                  icon={<LayoutDashboard className="h-5 w-5" />} 
                  title="Overview" 
                  href="/dashboard" 
                  isActive={isActive("/dashboard")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  icon={<Cloud className="h-5 w-5" />} 
                  title="Weather" 
                  href="/dashboard/weather" 
                  isActive={isActive("/dashboard/weather")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  icon={<Newspaper className="h-5 w-5" />} 
                  title="News" 
                  href="/dashboard/news" 
                  isActive={isActive("/dashboard/news")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  icon={<LineChart className="h-5 w-5" />} 
                  title="Finance" 
                  href="/dashboard/finance" 
                  isActive={isActive("/dashboard/finance")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
                <div className="my-2 border-t border-border/40"></div>
                <NavItem 
                  icon={<Settings className="h-5 w-5" />} 
                  title="Settings" 
                  href="/dashboard/settings" 
                  isActive={isActive("/dashboard/settings")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  icon={<HelpCircle className="h-5 w-5" />} 
                  title="Help & Support" 
                  href="/dashboard/help" 
                  isActive={isActive("/dashboard/help")} 
                  isCollapsed={false}
                  onClick={closeMobileMenu}
                />
              </nav>
            </div>
            
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">Free Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 border-r border-border/40 bg-background flex flex-col transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b border-border/40">
        {!isCollapsed && (
          <div className="flex items-center gap-2 font-semibold">
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
            <span>Dashboard</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto py-2 px-2">
        <nav className="grid gap-1">
          <NavItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            title="Overview" 
            href="/dashboard" 
            isActive={isActive("/dashboard")} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<Cloud className="h-5 w-5" />} 
            title="Weather" 
            href="/dashboard/weather" 
            isActive={isActive("/dashboard/weather")} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<Newspaper className="h-5 w-5" />} 
            title="News" 
            href="/dashboard/news" 
            isActive={isActive("/dashboard/news")} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<LineChart className="h-5 w-5" />} 
            title="Finance" 
            href="/dashboard/finance" 
            isActive={isActive("/dashboard/finance")} 
            isCollapsed={isCollapsed}
          />
          <div className={cn("my-2 border-t border-border/40", isCollapsed && "mx-2")}></div>
          <NavItem 
            icon={<Settings className="h-5 w-5" />} 
            title="Settings" 
            href="/dashboard/settings" 
            isActive={isActive("/dashboard/settings")} 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            icon={<HelpCircle className="h-5 w-5" />} 
            title="Help & Support" 
            href="/dashboard/help" 
            isActive={isActive("/dashboard/help")} 
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
      
      <div className="p-4 border-t border-border/40">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground">Free Account</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
