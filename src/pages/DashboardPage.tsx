import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import "animate.css";

/**
 * DashboardPage Component
 * Protected page shown after successful login
 */
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/95 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-2xl font-bold text-primary">ERTickApp</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Hide welcome message on mobile */}
            <span className="hidden md:inline-block text-sm text-muted-foreground">
              Welcome, <span className="font-semibold text-foreground">{user?.username}</span>
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Logout</span>
              <span className="inline xs:hidden">Out</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]">
        <div className="text-center animate__animated animate__fadeIn animate__slow w-full px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            COMING SOON
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mt-4 sm:mt-8">
            We're working hard to bring you something amazing!
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

