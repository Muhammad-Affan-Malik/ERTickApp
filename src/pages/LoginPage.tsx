import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Lock, AlertCircle, CheckCircle } from "lucide-react";
import ERTickAppLogo from "@/assets/ERTickAppLogo.png";
import ERManagerLogo from "@/assets/ERManagerCSLogo.png";
import LoginBackground from "@/assets/Login Background/Dashboard (2).png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{userId?: string; password?: string; general?: string}>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Clear form functionality with "cls" key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && e.ctrlKey) {
        e.preventDefault();
        clearForm();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const clearForm = () => {
    setUserId("");
    setPassword("");
    setErrors({});
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors: {userId?: string; password?: string; general?: string} = {};

    // User ID validation (can be email or username)
    if (!userId.trim()) {
      newErrors.userId = "User ID or Email is required";
    } else if (userId.trim().length < 3) {
      newErrors.userId = "User ID must be at least 3 characters";
    } else {
      // Check if it's an email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      
      if (emailRegex.test(userId.trim())) {
        // It's an email - validate email format
        if (userId.trim().length > 254) {
          newErrors.userId = "Email is too long";
        }
      } else {
        // It's a username - validate username format
        if (!usernameRegex.test(userId.trim())) {
          newErrors.userId = "Username can only contain letters, numbers, and underscores";
        } else if (userId.trim().length > 20) {
          newErrors.userId = "Username must be less than 20 characters";
        }
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (password.length > 128) {
      newErrors.password = "Password is too long";
    } else {
      // Check password complexity
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
      let complexityErrors = [];
      if (!hasUpperCase) complexityErrors.push("one uppercase letter");
      if (!hasLowerCase) complexityErrors.push("one lowercase letter");
      if (!hasNumbers) complexityErrors.push("one number");
      if (!hasSpecialChar) complexityErrors.push("one special character");
      
      if (complexityErrors.length > 0) {
        newErrors.password = `Password must contain at least ${complexityErrors.join(", ")}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous messages
    setErrors({});
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different scenarios
          const random = Math.random();
          
          if (random < 0.7) {
            // Success case
            resolve("Login successful");
          } else if (random < 0.9) {
            // Network error
            reject(new Error("Network error. Please check your connection."));
          } else {
            // Invalid credentials
            reject(new Error("Invalid User ID or Password"));
          }
        }, 1500);
      });

      // Success
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        // In real app, redirect to dashboard
        alert("Login functionality would redirect to dashboard here!");
        clearForm();
      }, 2000);

    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        if (error.message.includes("Network")) {
          setErrors({ general: "Network error. Please check your internet connection and try again." });
        } else if (error.message.includes("Invalid")) {
          setErrors({ general: "Invalid User ID or Password. Please try again." });
        } else {
          setErrors({ general: "An unexpected error occurred. Please try again." });
        }
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={LoginBackground} 
          alt="Login Background" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for better form readability */}
        <div className="absolute inset-0 bg-white/10"></div>
      </div>
      
      
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-sm mx-auto">
          {/* Header Section */}
          <div className="mb-6 -mt-4">
            {/* Logo */}
            <div className="text-center mb-2">
              <img 
                src={ERTickAppLogo} 
                alt="ERTickApp Logo" 
                className="h-48 w-48 object-contain cursor-pointer hover:opacity-80 transition-opacity mx-auto mb-[-25px] mt-[-70px] drop-shadow-lg"
                onClick={() => navigate("/")}
                style={{filter: 'brightness(1.1) contrast(1.2)'}}
              />
            </div>
            <p className="text-center text-gray-700 font-medium -mt-12">Seamless Ticketing, Smarter Support</p>
          </div>

          {/* Login Card */}
          <Card className="p-6 shadow-2xl border border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
              <p className="text-gray-600 text-xs text-center -mb-3">Use your employee ID and password to sign in</p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}

            {/* General Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID Field */}
              <div className="max-w-xs mx-auto">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your username"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      if (errors.userId) {
                        setErrors(prev => ({ ...prev, userId: undefined }));
                      }
                    }}
                    className={`pl-10 py-3 rounded-md ${
                      errors.userId 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    style={{
                      outline: 'none',
                      boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                      if (!errors.userId) {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.boxShadow = '0 0 0 4px rgba(96, 165, 250, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.userId) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
                {errors.userId && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.userId}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="max-w-xs mx-auto">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: undefined }));
                      }
                    }}
                    className={`pl-10 py-3 rounded-md ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    style={{
                      outline: 'none',
                      boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                      if (!errors.password) {
                        e.target.style.borderColor = '#60a5fa';
                        e.target.style.boxShadow = '0 0 0 4px rgba(96, 165, 250, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.password) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 px-12 text-base font-medium rounded-full inline-flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>

            {/* Help Text */}
            <div className="mt-4">
              <p className="text-center text-gray-500 text-xs">
                Contact your administrator if you need access or have forgotten your credentials
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      
      <div className="p-4 relative z-10 space-y-2">

        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-500 text-xs">
            © 2025, Designed and Developed by
          </span>
          <img 
            src={ERManagerLogo} 
            alt="ERManager Consulting Services" 
            className="h-4 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          />
        </div>

      </div>
    </div>
  );
}
