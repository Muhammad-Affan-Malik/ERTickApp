import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import "animate.css";

interface LoginSectionProps {
  onGoBack: () => void; 
}

  const LoginSection = ({ onGoBack }: LoginSectionProps) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isUserIdShaking, setIsUserIdShaking] = useState(false);
  const [isPasswordShaking, setIsPasswordShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasUserIdErrorFocus, setHasUserIdErrorFocus] = useState(false);
  const [hasPasswordErrorFocus, setHasPasswordErrorFocus] = useState(false)
  const userIdInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const loginButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Auto-focus on User ID field when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      userIdInputRef.current?.focus();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  /**
   * Handle form validation and login
   */
  const handleLogin = async () => {
    // Reset error state
    setLoginError("");
    setIsUserIdShaking(false);
    setIsPasswordShaking(false);
    setHasUserIdErrorFocus(false);
    setHasPasswordErrorFocus(false);

    const isUserIdEmpty = !userId.trim();
    const isPasswordEmpty = !password.trim();

    // Check if either or both fields are empty - shake both fields
    if (isUserIdEmpty || isPasswordEmpty) {
      let errorMessage = "";
      if (isUserIdEmpty && isPasswordEmpty) {
        errorMessage = "Please enter your User ID and Password";
      } else if (isUserIdEmpty) {
        errorMessage = "Please enter your User ID";
      } else {
        errorMessage = "Please enter your Password";
      }
      
      setLoginError(errorMessage);
      setIsUserIdShaking(true);
      setIsPasswordShaking(true);
      setHasUserIdErrorFocus(true);
      setHasPasswordErrorFocus(true);
      setTimeout(() => {
        setIsUserIdShaking(false);
        setIsPasswordShaking(false);
      }, 500);
      return;
    }

    // If validation passes, attempt login
    setIsLoading(true);

    try {
      const isAuthenticated = await login(userId, password);
      
      if (isAuthenticated) {
        // Clear form on success
        setUserId("");
        setPassword("");
        setLoginError("");
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setLoginError("Invalid User ID or Password");
        setIsUserIdShaking(true);
        setIsPasswordShaking(true);
        setHasUserIdErrorFocus(true);
        setHasPasswordErrorFocus(true);
        setTimeout(() => {
          setIsUserIdShaking(false);
          setIsPasswordShaking(false);
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Invalid User ID or Password");
      setIsUserIdShaking(true);
      setIsPasswordShaking(true);
      setHasUserIdErrorFocus(true);
      setHasPasswordErrorFocus(true);
      setTimeout(() => {
        setIsUserIdShaking(false);
        setIsPasswordShaking(false);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Enter key press to move between fields
   * @param nextRef - Reference to the next field to focus
   */
  const handleKeyDown = (
    e: React.KeyboardEvent,
    nextRef: React.RefObject<HTMLInputElement | null> | React.RefObject<HTMLButtonElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  // Clear error when user starts typing
  const handleInputChange = (
    setter: (value: string) => void,
    value: string,
    field: 'userId' | 'password'
  ) => {
    setter(value);
    if (loginError) {
      setLoginError("");
      if (field === 'userId') {
        setHasUserIdErrorFocus(false);
      } else {
        setHasPasswordErrorFocus(false);
      }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto px-4">
      <div className="space-y-3">
        {/* Error Message */}
        {loginError && (
          <div className="text-center">
            <p className="text-white text-sm font-medium">{loginError}</p>
          </div>
        )}

        {/* Username Input */}
        <div className={`relative ${isUserIdShaking ? 'animate__animated animate__shakeX' : ''}`}>
          <User className="absolute left-1/2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" style={{ marginLeft: '-60px' }} />
          <Input
            ref={userIdInputRef}
            id="userId"
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => handleInputChange(setUserId, e.target.value, 'userId')}
            onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
            className={`w-full text-center !py-2 sm:!py-2.5 !px-4 text-xs sm:text-sm font-normal rounded-full bg-white transition-all ${
              hasUserIdErrorFocus ? 'border-red-600' : ''
            }`}
            style={{ 
              textAlign: 'center',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              borderColor: hasUserIdErrorFocus ? '#dc2626' : undefined,
              borderWidth: hasUserIdErrorFocus ? '2px' : undefined,
              boxShadow: hasUserIdErrorFocus ? '0 0 0 3px rgba(220, 38, 38, 0.4), 0 0 10px rgba(220, 38, 38, 0.3)' : undefined
            }}
          />
        </div>

        {/* Password Input */}
        <div className={`relative ${isPasswordShaking ? 'animate__animated animate__shakeX' : ''}`}>
          <Lock className="absolute left-1/2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" style={{ marginLeft: '-65px' }} />
          <Input
            ref={passwordInputRef}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(setPassword, e.target.value, 'password')}
            onKeyDown={(e) => handleKeyDown(e, loginButtonRef)}
            className={`w-full text-center !py-2 sm:!py-2.5 !px-4 text-xs sm:text-sm font-normal rounded-full bg-white transition-all ${
              hasPasswordErrorFocus ? 'border-red-600' : ''
            }`}
            style={{ 
              textAlign: 'center',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              borderColor: hasPasswordErrorFocus ? '#dc2626' : undefined,
              borderWidth: hasPasswordErrorFocus ? '2px' : undefined,
              boxShadow: hasPasswordErrorFocus ? '0 0 0 3px rgba(220, 38, 38, 0.4), 0 0 10px rgba(220, 38, 38, 0.3)' : undefined
            }}
          />
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1/2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
              style={{ marginRight: '-65px' }}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Buttons or Loading State */}
        <div className="pt-2 relative">
          {!isLoading ? (
            <div className="flex gap-2 animate__animated animate__fadeIn">
              <Button
                onClick={onGoBack}
                className="flex-1 text-gray-700 !py-2 sm:!py-2.5 text-xs sm:text-sm font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-gray-100 hover:bg-gray-200"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Go Back
              </Button>
              
              <Button
                ref={loginButtonRef}
                onClick={handleLogin}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="flex-1 text-white !py-2 sm:!py-2.5 text-xs sm:text-sm font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#1e3a8a' }}
              >
                Login
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center py-2 animate__animated animate__zoomIn">
              <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSection;