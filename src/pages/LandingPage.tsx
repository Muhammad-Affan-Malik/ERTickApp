import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, Zap, BarChart3, Users, Calendar, AlertTriangle, UserCheck, FileText, MessageSquare, CheckCircle, Timer, Check, ArrowRight, User, Lock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "animate.css";
import ERManagerLogo from "@/assets/ERManagerCSLogo.png";
import DashboardPreview from "@/assets/DashboardPreviews/DashboardPreview.png";
import AgentDashboard from "@/assets/DashboardPreviews/AgentDashboard.png";
import AttendanceManagement from "@/assets/DashboardPreviews/AttendanceManagement.jpg";
import IncidentManagement from "@/assets/DashboardPreviews/IncidentManagement.png";
import LeaveReq from "@/assets/DashboardPreviews/LeaveReq.png";
import RequirementGathering from "@/assets/DashboardPreviews/RequirementGathering.png";
import TicketChat from "@/assets/DashboardPreviews/TicketChat.png";
import TicketStatus from "@/assets/DashboardPreviews/TicketStatus.png";
import TimeSheetTracking from "@/assets/DashboardPreviews/TimeSheetTracking.png";

const Landing = () => {
  const [, setIsHovered] = useState(false);
  const [activePreview, setActivePreview] = useState(DashboardPreview);
  const [selectedOption, setSelectedOption] = useState(0); // Default to "Overview" (index 0)
  const [isPreviewInteracted, setIsPreviewInteracted] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    highlights: false,
    whoWeAre: false,
    about: false,
    footer: false,
    features: false,
    benefits: false,
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{userId?: string; password?: string; general?: string}>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);

  // Refs for each section
  //refs for each section used 
  //isPreview has been fixed
  const highlightsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const aboutRef = useRef(null);
  const footerRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  
  const fullText = "One Work Platform To Manage Attendance & Tasks Effortlessly";
  const words = fullText.split(' ');

  // Clear form functionality
  const clearForm = () => {
    setUserId("");
    setPassword("");
    setErrors({});
    setSuccessMessage("");
  };

  // Validation function (same as LoginPage)
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

  // Login form handler (same as LoginPage)
  const handleLoginSubmit = async (e: React.FormEvent) => {
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
        setShowLoginModal(false);
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

  useEffect(() => {
    const revealSpeedMs = 300;        // delay between each word reveal (slower)
    const pauseAfterRevealMs = 2500;  // longer pause once full sentence is shown
    const pauseAfterHideMs = 700;     // small pause after hide before next loop

    let cancelled = false;
    const timers: number[] = [];

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(fn, ms);
      timers.push(id);
    };

    const runCycle = () => {
      let currentIndex = 0;

      const stepReveal = () => {
        if (cancelled) return;
        if (currentIndex <= words.length) {
          setVisibleWords(currentIndex);
          currentIndex++;
          later(stepReveal, revealSpeedMs);
        } else {
          // full sentence visible → pause, then hide and restart
          later(() => {
            if (cancelled) return;
            setVisibleWords(0);
            later(() => {
              if (cancelled) return;
              runCycle();
            }, pauseAfterHideMs);
          }, pauseAfterRevealMs);
        }
      };

      stepReveal();
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, [words.length]);

  // Auto-slide carousel for dashboard previews
  useEffect(() => {
    if (!isPreviewInteracted) {
      const slideInterval = setInterval(() => {
        setSelectedOption((prev) => {
          const nextSlide = (prev + 1) % dashboardOptions.length;
          setActivePreview(dashboardOptions[nextSlide].image);
          return nextSlide;
        });
      }, 3500); // Change slide every 3.5 seconds

      return () => clearInterval(slideInterval);
    }
  }, [isPreviewInteracted]);

  // Auto-rotate highlights for mobile
  useEffect(() => {
    const highlightInterval = setInterval(() => {
      setActiveHighlightIndex((prev) => (prev + 1) % highlights.length);
    }, 3000); // Change highlight every 3 seconds

    return () => clearInterval(highlightInterval);
  }, []);

  // Scroll observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            if (sectionName) {
              setVisibleSections(prev => ({
                ...prev,
                [sectionName]: true
              }));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    if (highlightsRef.current) observer.observe(highlightsRef.current);
    if (whoWeAreRef.current) observer.observe(whoWeAreRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (footerRef.current) observer.observe(footerRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (benefitsRef.current) observer.observe(benefitsRef.current);

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Clock,
      title: "Real-time updates",
    },
    {
      icon: Zap,
      title: "Simplified workflow",
    },
    {
      icon: BarChart3,
      title: "Insightful reports",
    },
  ];

  const dashboardOptions = [
    {
      icon: BarChart3,
      title: "Overview",
      image: DashboardPreview,
    },
    {
      icon: Calendar,
      title: "Attendance",
      image: AttendanceManagement,
    },
    {
      icon: AlertTriangle,
      title: "Incident Management",
      image: IncidentManagement,
    },
    {
      icon: UserCheck,
      title: "Leave Requests",
      image: LeaveReq,
    },
    {
      icon: FileText,
      title: "Requirements",
      image: RequirementGathering,
    },
    {
      icon: MessageSquare,
      title: "Ticket Chat",
      image: TicketChat,
    },
    {
      icon: CheckCircle,
      title: "Ticket Status",
      image: TicketStatus,
    },
    {
      icon: Timer,
      title: "Time Tracking",
      image: TimeSheetTracking,
    },
    {
      icon: Users,
      title: "Agent Dashboard",
      image: AgentDashboard,
    },
  ];

  return (
    
    <>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/95 sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-2 flex justify-start items-center">
          <div className="flex items-center gap-4 ml-7">
            <Link to="/" className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <img 
                src={ERManagerLogo} 
                alt="ERManager Consulting Services" 
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Card */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative">
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate__animated animate__pulse animate__infinite"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate__animated animate__pulse animate__infinite" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate__animated animate__pulse animate__infinite" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6x6 mx-auto -mt-20 relative z-10">
          <Card className="rounded-[3rem] shadow-none relative overflow-hidden" style={{ backgroundColor: '#0B132B' }}>
            
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
              {/* Hero Section */}
              <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight min-h-[200px] flex items-center justify-center text-center text-white" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 400 }}>
                  <span className="reveal-text">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className={`reveal-word ${index < visibleWords ? 'visible' : ''}`}
                        style={{ 
                          transitionDelay: `${index * 0.15}s`,
                          color: 'white'
                        }}
                      >
                        {word}
                        {index < words.length - 1 && <span>&nbsp;</span>}
                      </span>
                    ))}
                  </span>
                </h1>
                
                <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-white max-w-[280px] sm:max-w-sm md:max-w-2xl mx-auto px-2 sm:px-4 text-center leading-relaxed">
                  <p className="md:whitespace-nowrap" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Seamless Ticketing, Smarter Support
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    className="group text-white !py-6 !px-8 text-base font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: '#1e3a8a' }}
                    onClick={() => setShowLoginModal(true)}
                  >
                    Enter Dashboard
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>


              </div>

              {/* System Highlights */}
              <div className="max-w-5xl mx-auto" ref={highlightsRef} data-section="highlights">
                <div className={`transition-all duration-1000 ${visibleSections.highlights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ backgroundColor: '#0B132B', padding: '2rem', borderRadius: '1.5rem' }}>
                  {/* Desktop: Elegant horizontal layout */}
                  <div className="hidden md:flex md:flex-row items-center justify-center gap-8 md:gap-12">
                    {highlights.map((highlight, index) => (
                      <div
                        key={highlight.title}
                        className={`group flex items-center gap-4 cursor-pointer transition-all duration-500 hover:scale-105 ${visibleSections.highlights ? 'animate__animated animate__fadeInUp' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Icon with subtle styling */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                            <highlight.icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
                          </div>
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Text content */}
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                            {highlight.title}
                          </h3>
                          <div className="w-0 h-0.5 bg-gradient-to-r from-orange-400 to-white group-hover:w-full transition-all duration-500 rounded-full mt-1"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile: Compact carousel-like single highlight display */}
                  <div className="md:hidden flex flex-col items-center justify-center min-h-[80px] relative">
                    {highlights.map((highlight, index) => (
                      <div
                        key={highlight.title}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                          index === activeHighlightIndex
                            ? 'opacity-100 translate-y-0 scale-100 z-10'
                            : index === (activeHighlightIndex + 1) % highlights.length
                            ? 'opacity-0 translate-y-8 scale-95 z-0'
                            : 'opacity-0 translate-y-8 scale-95 z-0'
                        }`}
                        style={{
                          transform: index === activeHighlightIndex 
                            ? 'translateY(0) scale(1)' 
                            : 'translateY(20px) scale(0.95)'
                        }}
                      >
                        <div className="group flex items-center gap-3 cursor-pointer">
                          {/* Compact icon */}
                          <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
                              <highlight.icon className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                            </div>
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-lg bg-blue-400 opacity-10 blur-sm transition-opacity duration-300"></div>
                          </div>
                          
                          {/* Compact text content */}
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                              {highlight.title}
                            </h3>
                            <div className="w-full h-0.5 bg-gradient-to-r from-orange-400 to-white rounded-full mt-1"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard Preview - Mobile Responsive */}
              <div className="max-w-5xl mx-auto mt-8 md:mt-16">
                <div className="rounded-2xl p-2 sm:p-4 md:p-12">
                  {/* Mobile Layout - Stacked */}
                  <div className="block md:hidden space-y-6">
                    {/* Dashboard Preview Image with Slide Indicator */}
                    <div className="relative">
                      <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden" style={{ backgroundColor: '#0B132B' }}>
                      <img 
                          key={activePreview}
                        src={activePreview} 
                        alt="Dashboard Preview" 
                          className="w-full h-full object-contain rounded-xl transition-all duration-700 ease-in-out animate__animated animate__fadeIn opacity-0"
                      />
                      </div>
                      
                      {/* Slide Indicators */}
                      <div className="flex justify-center gap-2 mt-4">
                        {dashboardOptions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedOption(index);
                              setActivePreview(dashboardOptions[index].image);
                              setIsPreviewInteracted(true);
                            }}
                            className={`transition-all duration-300 ${
                              selectedOption === index
                                ? 'w-8 h-2 bg-blue-600'
                                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                            } rounded-full`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Options Card - Full Width on Mobile */}
                    <div className="w-full bg-white shadow-2xl border border-gray-200 rounded-xl">
                      <div className="p-3 sm:p-4">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-800 text-center">What would you like to manage?</h3>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {dashboardOptions.map((option, index) => (
                            <div
                              key={index}
                              className="relative cursor-pointer"
                              onClick={() => {
                                setSelectedOption(index);
                                setIsPreviewInteracted(true);
                                setActivePreview(option.image); // ensure preview updates on tap
                              }}
                              onTouchStart={() => {
                                setActivePreview(option.image);
                                setSelectedOption(index);
                              }}
                              onMouseEnter={() => {
                                setActivePreview(option.image);
                                setIsHovered(true);
                              }}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              <div className={`h-20 rounded-lg border-2 flex flex-col items-center justify-center p-1 transition-all duration-200 ${
                                selectedOption === index 
                                  ? 'bg-white' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`} style={{
                                borderColor: selectedOption === index ? '#1e3a8a' : undefined,
                                boxShadow: selectedOption === index ? '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)' : undefined
                              }} onMouseEnter={(e) => {
                                if (selectedOption !== index) {
                                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)';
                                }
                              }} onMouseLeave={(e) => {
                                if (selectedOption !== index) {
                                  e.currentTarget.style.boxShadow = '';
                                }
                              }}>
                                <div className="absolute top-1 left-1 w-3 h-3 border border-gray-300 rounded-sm bg-white flex items-center justify-center">
                                  {selectedOption === index && (
                                    <Check className="w-2 h-2 text-gray-800" strokeWidth={3} />
                                  )}
                                </div>
                                
                                {/* Icon */}
                                <div className="flex-1 flex items-center justify-center mt-1">
                                  <option.icon className={`w-3 h-3 transition-colors ${
                                    selectedOption === index ? 'text-gray-800' : 'text-gray-600'
                                  }`} />
                                </div>
                                
                                {/* Label */}
                                <span className={`text-[10px] font-medium text-center leading-tight px-1 ${
                                  selectedOption === index ? 'text-gray-800' : 'text-gray-600'
                                }`}>
                                  {option.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-center">
                          <Link to="/login">
                            <Button 
                              className="text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200 w-full"
                              style={{ backgroundColor: '#1e3a8a' }}
                              onClick={() => setIsPreviewInteracted(true)}
                            >
                              Get Started
                              <span className="ml-1">→</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout - Side by Side */}
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="w-full aspect-video rounded-xl flex items-center justify-center relative overflow-visible" style={{ backgroundColor: '#0B132B' }}>
                      <img 
                          key={activePreview}
                        src={activePreview} 
                        alt="Dashboard Preview" 
                          className="w-full h-full object-contain rounded-xl transition-all duration-700 ease-in-out animate__animated animate__fadeIn opacity-0"
                      />
                        
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 rounded-xl pointer-events-none"></div>

                      {/* Options Card positioned inside */}
                      <div className="absolute top-4 right-[-100px] w-80 bg-white shadow-2xl border border-gray-200 rounded-xl">
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">What would you like to manage?</h3>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {dashboardOptions.map((option, index) => (
                              <div
                                key={index}
                                className="relative cursor-pointer"
                                onClick={() => {
                                  setSelectedOption(index);
                                  setIsPreviewInteracted(true);
                                }}
                                onMouseEnter={() => {
                                  setActivePreview(option.image);
                                  setIsHovered(true);
                                }}
                                onMouseLeave={() => setIsHovered(false)}
                              >
                                <div className={`aspect-square rounded-md border-2 flex flex-col items-center justify-center p-2 transition-all duration-200 ${
                                  selectedOption === index 
                                    ? 'bg-white' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`} style={{
                                  borderColor: selectedOption === index ? '#1e3a8a' : undefined,
                                  boxShadow: selectedOption === index ? '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)' : undefined
                                }} onMouseEnter={(e) => {
                                  if (selectedOption !== index) {
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(30, 58, 138, 0.1), 0 2px 4px -1px rgba(30, 58, 138, 0.06)';
                                  }
                                }} onMouseLeave={(e) => {
                                  if (selectedOption !== index) {
                                    e.currentTarget.style.boxShadow = '';
                                  }
                                }}>
                                  {/* Checkbox */}
                                  <div className="absolute top-1 left-1 w-3 h-3 border border-gray-300 rounded-sm bg-white flex items-center justify-center">
                                    {selectedOption === index && (
                                      <Check className="w-2 h-2 text-gray-800" strokeWidth={3} />
                                    )}
                                  </div>
                                  
                                  {/* Icon */}
                                  <div className="flex-1 flex items-center justify-center mt-1">
                                    <option.icon className={`w-4 h-4 transition-colors ${
                                      selectedOption === index ? 'text-gray-800' : 'text-gray-600'
                                    }`} />
                                  </div>
                                  
                                  {/* Label */}
                                  <span className={`text-xs font-medium text-center leading-tight ${
                                    selectedOption === index ? 'text-gray-800' : 'text-gray-600'
                                  }`}>
                                    {option.title}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="text-center">
                            <Link to="/login">
                              <Button 
                                className="text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200"
                                style={{ backgroundColor: '#1e3a8a' }}
                                onClick={() => setIsPreviewInteracted(true)}
                              >
                                Get Started
                                <span className="ml-1">→</span>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      </div>
                      
                      {/* Slide Indicators for Desktop */}
                      <div className="flex justify-center gap-2 mt-6">
                        {dashboardOptions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedOption(index);
                              setActivePreview(dashboardOptions[index].image);
                              setIsPreviewInteracted(true);
                            }}
                            className={`transition-all duration-300 ${
                              selectedOption === index
                                ? 'w-8 h-2 bg-blue-600'
                                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                            } rounded-full`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="container mx-auto px-6 py-16" ref={featuresRef} data-section="features">
        <div className="max-w-7xl mx-auto -mt-12">
          {/* Section intentionally left without a headline per request */}
          
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch transition-all duration-1000 ${visibleSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Feature 1 - Navy Blue (now first) */}
            <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.1s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-indigo-900 mt-[-15px] mb-[15px]">
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">In-Depth Expertise</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-2" />
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Our professionals are experienced veterans with rich expertise in a broad array of disciplines, including:
                  </p>
                  <ul className="text-indigo-100 text-sm leading-relaxed space-y-2 text-left max-w-sm mx-auto">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Development of Business Strategy</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Organizational Growth and Optimization</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Digital Transformation Strategies</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Performance Improvement Strategies</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Change Management Execution</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1" />Smooth Technology Integration</li>
                  </ul>
                  <div className="flex-1" />
                  <div className="mt-4">
                    <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium underline underline-offset-4 decoration-white">
                      Learn more <span>→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 2 - Yellow (now middle) */}
            <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.25s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500 mt-[-15px] mb-[15px]">
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Customized Strategic Solutions</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-2" />
                  <p className="text-gray-800 text-sm leading-relaxed">
                    We understand that every organization is different, and we don’t believe in a one-size-fits-all solution. Our consultants make a detailed analysis of your business, industry dynamics, and particular goals to create customized strategies that are exactly in sync with your challenges and objectives.
                  </p>
                  <div className="flex-1" />
                  <div className="mt-4">
                    <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-900 font-medium underline underline-offset-4 decoration-black/40 hover:decoration-black">
                      Learn more <span>→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Feature 3 - Orange (last) */}
            <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.4s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 mt-[-15px] mb-[15px]">
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">Data-Driven Insights</h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-200 to-indigo-300 mx-auto mb-2" />
                  <p className="text-orange-50 text-sm leading-relaxed">
                    With the help of advanced analytics, market insights, and new-age tools, we offer data-driven recommendations that transcend traditional consulting norms. Our methodology ensures that each strategy is highly informed, actionable, and results-oriented.
                  </p>
                  <div className="flex-1" />
                  <div className="mt-4">
                    <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium underline underline-offset-4 decoration-white/60 hover:decoration-white">
                      Learn more <span>→</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="container mx-auto px-6 py-16" ref={whoWeAreRef} data-section="whoWeAre">
        <div className="max-w-6xl mx-auto -mt-10">
          <Card className={`bg-gradient-to-br from-slate-50 to-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] border-border/60 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInDown' : 'opacity-0 translate-y-4'}`}>
                  Who We Are
                </h2>
                <div className={`w-24 h-1 bg-gradient-tox -r from-slate-500 to-gray-600 mx-auto mb-8 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-x-4'}`}></div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className={`space-y-6 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-4'}`}>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg text-center">
                    ERManager Consulting Services is a renowned consulting company committed to enabling businesses with strategic solutions, 
                    advanced insights, and innovative methodologies. Composed of highly skilled professionals, we excel in leading organizations 
                    through intricate challenges, maximizing operational performance, and driving sustainable growth.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg text-center">
                    Our purpose is to be a valued ally to companies desiring to reach their full potential. We understand that each organization 
                    has unique strengths and possibilities, and we are dedicated to assisting our customers in uncovering and capitalizing on these 
                    assets to provide an enduring, positive impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section - Asymmetric 1x2 pattern (heading + description) */}
      <section className="container mx-auto px-6 py-16" ref={benefitsRef} data-section="benefits">
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch transition-all duration-1000 ${visibleSections.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Row 1 - Small heading (navy) */}
            <div className={`relative overflow-visible md:col-span-1 ${visibleSections.benefits ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.benefits ? '0.05s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-indigo-900">
                <CardContent className="p-10 text-center flex items-center justify-center h-full">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">ERManager Implementation & Support</h3>
                </CardContent>
              </Card>
            </div>
            {/* Row 1 - Big description (yellow) */}
            <div className={`relative overflow-visible md:col-span-2 ${visibleSections.benefits ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.benefits ? '0.15s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500">
                <CardContent className="p-10 text-center space-y-4 flex flex-col h-full">
                  <div className="w-28 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-2" />
                  <p className="text-gray-900/90 text-base leading-relaxed max-w-3xl mx-auto">Unlock operational efficiency with our structured ERManager ERP implementation and support services. We follow a phase-wise approach from analysis to go-live.. Our dedicated support team ensures your system runs smoothly with continuous maintenance, troubleshooting, and enhancements tailored to your evolving business needs..</p>
                  <div className="flex-1" />
                  <div className="mt-4">
                    <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-900 font-medium underline underline-offset-4 decoration-black/40 hover:decoration-black">Learn more <span>→</span></a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 2 - Small heading (orange) */}
            <div className={`relative overflow-visible md:col-span-1 ${visibleSections.benefits ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.benefits ? '0.25s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500">
                <CardContent className="p-10 text-center flex items-center justify-center h-full">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">ERTickAPP</h3>
                </CardContent>
              </Card>
            </div>
            {/* Row 2 - Big description (navy) */}
            <div className={`relative overflow-visible md:col-span-2 ${visibleSections.benefits ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.benefits ? '0.35s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-indigo-900">
                <CardContent className="p-10 text-center space-y-4 flex flex-col h-full">
                  <div className="w-28 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-2" />
                  <p className="text-indigo-100 text-base leading-relaxed max-w-3xl mx-auto">ERTickAPP streamlines ticketing and event management. Our powerful solution automates tickets and is tailored to simplify customer issue management with the help of SAP S4HANA, SAP B-ONE, and ERMANAGER.</p>
                  <div className="flex-1" />
                  <div className="mt-4">
                    <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-medium underline underline-offset-4 decoration-white/60 hover:decoration-white">Learn more <span>→</span></a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16 relative" ref={aboutRef} data-section="about">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-10 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6x6 mx-auto -mt-15 -mb-15 relative z-10">
          <Card className={`border-border/60 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] relative overflow-hidden ${visibleSections.about ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`} style={{ backgroundColor: '#0B132B' }}>
            {/* Decorative circles inside card */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl animate__animated animate__pulse animate__infinite"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl animate__animated animate__pulse animate__infinite" style={{ animationDelay: '1s' }}></div>
            
            <CardContent className="p-8 md:p-12 space-y-6 relative z-10">
              <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold text-white mb-8 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInDown' : 'opacity-0 translate-y-4'}`}>
                  About ERManager Consulting Services
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`space-y-4 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-x-4'}`}>
                  <p className="text-white leading-relaxed text-base md:text-lg">
                    ERManager consulting services is a sub-system of SAP-based SNS designed to simplify internal workforce management. 
                    It integrates attendance tracking and ticket-based task workflows in one secure portal.
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-400" />
                      <span className="text-sm font-medium text-white">SAP Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-400" />
                      <span className="text-sm font-medium text-white">Secure Portal</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex justify-center transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInRight' : 'opacity-0 translate-x-4'}`}>
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-orange-400/20 to-white/20 rounded-full flex items-center justify-center shadow-lg animate__animated animate__pulse animate__infinite">
                      <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center animate__animated animate__bounce animate__infinite">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    {/* Additional decorative elements */}
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center animate__animated animate__pulse animate__infinite" style={{ animationDelay: '0.5s' }}>
                      <Zap className="w-3 h-3 text-orange-500" />
                    </div>
                    <div className="absolute top-1/2 -right-4 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center animate__animated animate__bounce animate__infinite" style={{ animationDelay: '1s' }}>
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              

            </CardContent>
          </Card>
        </div>
      </section>


      {/* Footer */}
      <footer className="mt-16 relative" style={{ marginBottom: '-200px' }} ref={footerRef} data-section="footer">
        <div className="container mx-auto px-6">
          <Card className={`shadow-xl hover:shadow-2xl transition-all duration-500 rounded-t-[3rem] rounded-b-none border-border/60 ${visibleSections.footer ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`} style={{ backgroundColor: '#0B132B', paddingBottom: '0px', marginBottom: '0px' }}>
            <CardContent className="p-8 md:p-12 pb-0" style={{ paddingBottom: '0px', marginBottom: '0px' }}>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={ERManagerLogo} 
                      alt="ERManager Consulting Services" 
                      className="h-8 w-auto object-contain -ml-4"
                    />
                  </div>
                  <p className="text-sm text-white max-w-md md:whitespace-nowrap">
                    Seamless Ticketing, Smarter Support transform the way you manage support
                  </p>
                </div>
                
                <div className="space-y-4 text-left md:ml-60 ml-0">
                  <h3 className="font-bold text-white">Contact Us</h3>
                  <div className="space-y-4 text-sm text-white">
                    <div>
                      <p className="break-all">
                        <span className="font-semibold text-white">Website: </span>
                        <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors break-all">
                          https://ermanagercs.com/
                        </a>
                      </p>
                      <p className="mt-3">
                        <span className="font-semibold text-white">Phone: </span>
                        <a href="tel:+923352828371" className="text-white hover:text-white/80 transition-colors">
                          +923352828371
                        </a>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Head Office Address</h4>
                      <p className="break-words">
                        Plot# 225/1/ P.E.C.H.S Block 2, Karachi, Sindh,<br />
                        Pakistan.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Days Open</h4>
                      <p className="break-words">Monday to Friday 9:00 am to 6:00 pm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/30 mt-auto" style={{ marginBottom: '0px', paddingBottom: '0px' }}>
                <div className="flex items-center justify-center gap-2 pb-4" style={{ marginBottom: '0px' }}>
                  <span className="text-white text-xs">
                    © 2025, Designed and Developed by
                  </span>
                  <img 
                    src={ERManagerLogo} 
                    alt="ERManager Consulting Services" 
                    className="h-4 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </footer>

      {/* Simple Login Form */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-black/50 absolute inset-0" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative z-10 w-full max-w-sm">
            <Card className="p-6 shadow-2xl border border-gray-200 bg-white">
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
                <p className="text-gray-600 text-xs text-center">Use your employee ID and password to sign in</p>
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

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-6">
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

              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Card>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Landing;