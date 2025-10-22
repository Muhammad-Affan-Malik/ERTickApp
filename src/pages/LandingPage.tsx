import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShinyText } from "@/components/ui/shiny-text";
import { CheckCircle2, Clock, Zap, BarChart3, Users, Calendar, AlertTriangle, UserCheck, FileText, MessageSquare, CheckCircle, Timer, Check, ArrowRight, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "animate.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
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

// Text lines for the hero section animation
const TEXT_LINES = [
  "One Work Platform To Manage Attendance & Tasks Effortlessly",
  "Tired of the spreadsheet chaos?",
  "Seamless attendance, smarter task management, and simpler leave cycles.",
  "Clarity and control, at last.",
  "Building the workplace of tomorrow, today."
];

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
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Login form transition states
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasErrorFocus, setHasErrorFocus] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Refs for each section
  //refs for each section used 
  //isPreview has been fixed
  const highlightsRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const userIdInputRef = useRef<HTMLInputElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  const currentText = TEXT_LINES[currentTextIndex];
  const words = currentText.split(' ');

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
          // full sentence visible → pause, then hide and move to next text
          later(() => {
            if (cancelled) return;
            setVisibleWords(0);
            later(() => {
              if (cancelled) return;
              // Move to next text line
              setCurrentTextIndex((prev) => (prev + 1) % TEXT_LINES.length);
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
  }, [currentTextIndex, words.length]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Header scroll behavior for mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply this behavior on mobile (screen width < 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px
          setIsHeaderVisible(false);
        } else {
          // Scrolling up
          setIsHeaderVisible(true);
        }
      } else {
        // Always show header on desktop
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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

  // Handle login validation
  const handleLogin = () => {
    // Reset error state
    setLoginError("");
    setIsShaking(false);
    setHasErrorFocus(false);

    // Check if fields are empty
    if (!userId.trim() || !password.trim()) {
      setLoginError("Fields are required");
      setIsShaking(true);
      setHasErrorFocus(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // Validate credentials (you can replace this with actual authentication logic)
    // For demo purposes, let's check for specific credentials
    // Replace this with your actual validation logic
    const isValidCredentials = userId === "admin" && password === "password"; // Replace with your actual validation
    
    if (!isValidCredentials) {
      setLoginError("Invalid user ID or password");
      setIsShaking(true);
      setHasErrorFocus(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    // If validation passes, show loading state
    setIsLoading(true);
    console.log('Login successful', { userId, password });
    
    // Simulate API call - replace with your actual login logic
    setTimeout(() => {
      // Add your successful login logic here (e.g., redirect, set auth token, etc.)
      setIsLoading(false);
      // Example: window.location.href = '/dashboard';
    }, 2000);
  };

  // Transition handler for smooth animation between button and form
  const handleTransition = (shouldScroll: boolean = false) => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    
    // Clear errors and loading state when transitioning
    setLoginError("");
    setIsShaking(false);
    setIsLoading(false);
    setShowPassword(false);
    setHasErrorFocus(false);
    
    // Set animation direction based on current state
    if (!isLoginFormVisible) {
      setAnimationDirection('forward'); // Button -> Form
      
      // Scroll to hero section if needed
      if (shouldScroll) {
        setTimeout(() => {
          if (lenisRef.current && heroSectionRef.current) {
            lenisRef.current.scrollTo(heroSectionRef.current, {
              offset: -100,
              duration: 1.5,
            });
          }
        }, 100);
      }
    } else {
      setAnimationDirection('backward'); // Form -> Button
    }
    
    // Toggle the login form visibility after a slight delay for animation
    setTimeout(() => {
      setIsLoginFormVisible(!isLoginFormVisible);
      setIsAnimating(false);
      
      // Focus on username input after form is visible
      if (!isLoginFormVisible && shouldScroll) {
        setTimeout(() => {
          userIdInputRef.current?.focus();
        }, 600); // Wait for scroll and animation to complete
      }
    }, 500); // Match animation duration (0.5s)
  };

  return (
    
    <>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Header */}
      <header className={`border-b border-border/50 bg-card/95 sticky top-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
          {/* Mobile: Centered logo */}
          <div className="flex md:hidden items-center justify-center flex-1">
            <div 
              onClick={() => window.location.reload()} 
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={ERManagerLogo} 
                alt="ERManager Consulting Services" 
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Desktop: Left-aligned logo */}
          <div className="hidden md:flex items-center gap-4 ml-7">
            <div 
              onClick={() => window.location.reload()} 
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src={ERManagerLogo} 
                alt="ERManager Consulting Services" 
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Header Links */}
          <div className="hidden md:flex items-center gap-6 mr-7">
            <button 
              onClick={() => {
                if (lenisRef.current && whoWeAreRef.current) {
                  lenisRef.current.scrollTo(whoWeAreRef.current, {
                    offset: -100,
                    duration: 1.5,
                  });
                }
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm font-normal cursor-pointer"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              About
            </button>
            <button 
              onClick={() => {
                if (lenisRef.current && footerRef.current) {
                  lenisRef.current.scrollTo(footerRef.current, {
                    offset: 0,
                    duration: 1.5,
                  });
                }
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 text-sm font-normal cursor-pointer"
              style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Contact us
            </button>
            
            {/* Request a demo button */}
              <button 
              onClick={() => handleTransition(true)}
              className="px-6 py-2 rounded-full text-sm font-normal transition-all duration-200 relative group cursor-pointer"
                style={{ 
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  background: 'transparent',
                  color: '#4f46e5'
                }}
              >
                {/* Gradient border */}
                <div 
                  className="absolute inset-0 rounded-full border-2 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(90deg, #60a5fa, #a855f7)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}
                ></div>
                {/* Blue background on hover */}
                <div 
                  className="absolute inset-0 rounded-full bg-blue-600 opacity-0 transition-all duration-200 group-hover:opacity-100"
                  style={{ padding: '2px' }}
                ></div>
                <span className="relative z-10 transition-colors duration-200 group-hover:text-white">Get Started</span>
              </button>
          </div>
        </nav>
      </header>

      {/* Main Content Card */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative mt-[40px] sm:mt-0">
        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate__animated animate__pulse animate__infinite"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate__animated animate__pulse animate__infinite" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate__animated animate__pulse animate__infinite" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6x6 mx-auto -mt-20 relative z-10">
          <Card className="rounded-[3rem] shadow-none relative overflow-hidden" style={{ backgroundColor: '#0B132B' }}>
            
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
              {/* Hero Section with Transition */}
              <div ref={heroSectionRef} className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
                
                {/* Static Heading - Always Visible */}
                <div className="h-[240px] sm:h-[200px] md:h-[240px] lg:h-[260px] flex items-center justify-center overflow-hidden">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-normal leading-tight text-center text-white" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 400 }}>
                    <span key={currentTextIndex} className="reveal-text">
                      {words.map((word, index) => (
                        <span
                          key={`${currentTextIndex}-${index}`}
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
                </div>
                
                {/* Static Subheading - Always Visible */}
                <div className="h-[50px] sm:h-[90px] flex items-center justify-center">
                  <div className="text-sm sm:text-sm md:text-lg lg:text-xl text-white max-w-[280px] sm:max-w-sm md:max-w-2xl mx-auto px-2 sm:px-4 text-center leading-relaxed">
                    <div className="md:whitespace-nowrap" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                      <ShinyText speed={9}>
                        Seamless Ticketing, Smarter Support
                      </ShinyText>
                    </div>
                  </div>
                </div>

                {/* Transition Area - Only Button/Form Animates */}
                <div className="pt-4 relative h-[200px] sm:h-[220px] md:h-[260px] flex items-center justify-center">
                  
                  {/* Enter Dashboard Button */}
                  {!isLoginFormVisible && (
                    <div 
                      className={`${
                        isAnimating && animationDirection === 'forward' 
                          ? 'animate__animated animate__fadeOut animate__zoomOut' 
                          : ''
                      }`}
                      style={{ animationDuration: '0.5s' }}
                    >
                      <Button
                        onClick={() => handleTransition(false)}
                        className="group text-white !py-4 !px-6 sm:!py-6 sm:!px-8 text-sm sm:text-base font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ backgroundColor: '#1e3a8a' }}
                      >
                        Enter Dashboard
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  )}

                  {/* Login Form */}
                  {isLoginFormVisible && (
                    <div 
                      className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-full ${
                        isAnimating && animationDirection === 'backward'
                          ? 'animate__animated animate__fadeOut animate__zoomOut' 
                          : !isAnimating && animationDirection === 'forward'
                          ? 'animate__animated animate__fadeIn animate__zoomIn'
                          : ''
                      }`}
                      style={{ animationDuration: '0.5s' }}
                    >
                      <div className="w-full max-w-xs mx-auto px-4">
                        <div className="space-y-3">
                          {/* Error Message */}
                          {loginError && (
                            <div className="text-center">
                              <p className="text-white text-sm font-medium">{loginError}</p>
                            </div>
                          )}

                          {/* Username Input */}
                          <Input
                            ref={userIdInputRef}
                            id="userId"
                            type="text"
                            placeholder="User ID"
                            value={userId}
                            onChange={(e) => {
                              setUserId(e.target.value);
                              if (loginError) {
                                setLoginError("");
                                setHasErrorFocus(false);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleLogin();
                              }
                            }}
                            className={`w-full text-center !py-2 sm:!py-2.5 text-xs sm:text-sm font-normal rounded-full bg-white transition-all ${
                              hasErrorFocus ? 'border-red-600' : ''
                            } ${isShaking ? 'animate__animated animate__shakeX' : ''}`}
                            style={{ 
                              textAlign: 'center',
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              borderColor: hasErrorFocus ? '#dc2626' : undefined,
                              borderWidth: hasErrorFocus ? '2px' : undefined,
                              boxShadow: hasErrorFocus ? '0 0 0 3px rgba(220, 38, 38, 0.4), 0 0 10px rgba(220, 38, 38, 0.3)' : undefined
                            }}
                          />

                          {/* Password Input */}
                          <div className="relative">
                          <Input
                            id="password"
                              type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (loginError) {
                                  setLoginError("");
                                  setHasErrorFocus(false);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleLogin();
                                }
                              }}
                              className={`w-full text-center !py-2 sm:!py-2.5 !pr-4 text-xs sm:text-sm font-normal rounded-full bg-white transition-all ${
                                hasErrorFocus ? 'border-red-600' : ''
                              } ${isShaking ? 'animate__animated animate__shakeX' : ''}`}
                              style={{ 
                                textAlign: 'center',
                                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                borderColor: hasErrorFocus ? '#dc2626' : undefined,
                                borderWidth: hasErrorFocus ? '2px' : undefined,
                                boxShadow: hasErrorFocus ? '0 0 0 3px rgba(220, 38, 38, 0.4), 0 0 10px rgba(220, 38, 38, 0.3)' : undefined
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          {/* Buttons or Loading State */}
                          <div className="pt-2 relative">
                            {!isLoading ? (
                              <div className="flex gap-2 animate__animated animate__fadeIn">
                            <Button
                                  onClick={() => handleTransition(false)}
                              className="flex-1 text-gray-700 !py-2 sm:!py-2.5 text-xs sm:text-sm font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-gray-100 hover:bg-gray-200"
                            >
                              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                              Go Back
                            </Button>
                            
                              <Button
                                  onClick={handleLogin}
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
                    </div>
                  )}

                </div>

              </div>

              {/* System Highlights */}
              <div className="max-w-5xl mx-auto -mt-5" ref={highlightsRef} data-section="highlights">
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
                  <div className="hidden md:hidden space-y-6">
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
                            <Button 
                              className="text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200 w-full"
                              style={{ backgroundColor: '#1e3a8a' }}
                            onClick={() => {
                              setIsPreviewInteracted(true);
                              handleTransition(true);
                            }}
                            >
                              Get Started
                              <span className="ml-1">→</span>
                            </Button>
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
                              <Button 
                                className="text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200"
                                style={{ backgroundColor: '#1e3a8a' }}
                              onClick={() => {
                                setIsPreviewInteracted(true);
                                handleTransition(true);
                              }}
                              >
                                Get Started
                                <span className="ml-1">→</span>
                              </Button>
                          </div>
                        </div>
                      </div>
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


            {/* Feature 2 - Yellow (now middle) */}
            <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.25s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500 mt-[-15px] mb-[15px]">
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Customized Strategic Solutions</h3>
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

                        {/* Feature 1 - Navy Blue (now first) */}
                        <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.1s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden mt-[-15px] mb-[15px]" style={{ backgroundColor: '#0B132B' }}>
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">In-Depth Expertise</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Our professionals are experienced veterans with rich expertise in a broad array of disciplines, including:
                  </p>
                  <ul className="text-white text-sm leading-relaxed space-y-2 text-left max-w-sm mx-auto">
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

            {/* Feature 3 - Orange (last) */}
            <div className={`relative overflow-visible ${visibleSections.features ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.features ? '0.4s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 mt-[-15px] mb-[15px]">
                <CardContent className="p-8 text-center space-y-4 flex flex-col h-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">Data-Driven Insights</h3>
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
        <div className="max-w-6xl mx-auto -mt-12 -mb-14">
          <Card className={`shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] border-0 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`} style={{ backgroundColor: '#0B132B' }}>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInDown' : 'opacity-0 translate-y-4'}`}>
                  Who We Are
                </h2>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className={`space-y-6 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-4'}`}>
                  <p className="text-white leading-relaxed text-base md:text-lg text-center">
                    ERManager Consulting Services is a renowned consulting company committed to enabling businesses with strategic solutions, 
                    advanced insights, and innovative methodologies. Composed of highly skilled professionals, we excel in leading organizations 
                    through intricate challenges, maximizing operational performance, and driving sustainable growth.
                  </p>
                  
                  <p className="text-white leading-relaxed text-base md:text-lg text-center">
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
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden" style={{ backgroundColor: '#0B132B' }}>
                <CardContent className="p-10 text-center flex items-center justify-center h-full">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">ERManager Implementation & Support</h3>
                </CardContent>
              </Card>
            </div>
            {/* Row 1 - Big description (yellow) */}
            <div className={`relative overflow-visible md:col-span-2 ${visibleSections.benefits ? 'animate__animated animate__fadeInUp' : ''}`} style={{ animationDelay: visibleSections.benefits ? '0.15s' : undefined }}>
              <Card className="relative h-full border-gray-200 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_80px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 rounded-[3rem] overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500">
                <CardContent className="p-10 text-center space-y-4 flex flex-col h-full">
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
                  <div 
                    onClick={() => window.location.reload()} 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity w-fit"
                  >
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
                    onClick={() => window.location.reload()}
                    className="h-4 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </footer>

    </div>
    </>
  );
};

export default Landing;