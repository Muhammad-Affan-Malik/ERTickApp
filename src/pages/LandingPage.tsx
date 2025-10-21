import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Zap, BarChart3, Users, Calendar, AlertTriangle, UserCheck, FileText, MessageSquare, CheckCircle, Timer, Check, ArrowRight } from "lucide-react";
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
        <nav className="container mx-auto px-6 py-2 flex justify-center items-center">
          <div className="flex items-center gap-4">
            <img 
              src={ERManagerLogo} 
              alt="ERManager Consulting Services" 
              className="h-13 w-auto object-contain"
            />

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
          <Card className="bg-blue-50 rounded-[3rem] shadow-none relative overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-[3rem]"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-[3rem]"></div>
            
            <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 relative z-10">
              {/* Hero Section */}
              <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin leading-tight min-h-[200px] flex items-center justify-center text-center" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 200 }}>
                  <span className="reveal-text">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className={`reveal-word ${index < visibleWords ? 'visible' : ''}`}
                        style={{ 
                          transitionDelay: `${index * 0.15}s`,
                          background: 'linear-gradient(to right, #1f2937, #1e40af, #1f2937)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {word}
                        {index < words.length - 1 && <span>&nbsp;</span>}
                      </span>
                    ))}
                  </span>
                </h1>
                
                <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-700 max-w-[280px] sm:max-w-sm md:max-w-2xl mx-auto px-2 sm:px-4 text-center leading-relaxed">
                  <p className="md:whitespace-nowrap" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                  Seamless Ticketing, Smarter Support
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/login">
                    <Button
                      className="group bg-blue-600 hover:bg-blue-700 text-white !py-6 !px-8 text-base font-normal rounded-full inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Enter Dashboard
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>


              </div>

              {/* System Highlights */}
              <div className="max-w-4xl mx-auto" ref={highlightsRef} data-section="highlights">
                <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${visibleSections.highlights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {highlights.map((highlight, index) => (
                    <Card 
                      key={highlight.title} 
                      className={`bg-white border-blue-200 hover:shadow-lg transition-all duration-300 group hover:scale-105 ${visibleSections.highlights ? 'animate__animated animate__fadeInUp' : ''}`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <highlight.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-800">{highlight.title}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dashboard Preview - Mobile Responsive */}
              <div className="max-w-5xl mx-auto mt-8 md:mt-16">
                <div className="rounded-2xl p-2 sm:p-4 md:p-12">
                  {/* Mobile Layout - Stacked */}
                  <div className="block md:hidden space-y-6">
                    {/* Dashboard Preview Image with Slide Indicator */}
                    <div className="relative">
                      <div className="w-full h-64 sm:h-80 rounded-xl border border-border/40 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                      <img 
                          key={activePreview}
                        src={activePreview} 
                        alt="Dashboard Preview" 
                          className="w-full h-full object-contain rounded-xl transition-all duration-700 ease-in-out animate__animated animate__fadeIn"
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
                                  ? 'border-orange-300 bg-orange-50' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}>
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
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200 w-full"
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
                      <div className="w-full aspect-video rounded-xl border border-border/40 flex items-center justify-center relative overflow-visible bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl">
                      <img 
                          key={activePreview}
                        src={activePreview} 
                        alt="Dashboard Preview" 
                          className="w-full h-full object-contain rounded-xl transition-all duration-700 ease-in-out translate-x-[-100px] animate__animated animate__fadeIn"
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
                                    ? 'border-orange-300 bg-orange-50' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
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
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-xs font-medium rounded-full shadow-lg transition-all duration-200"
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
          <Card className={`border-border/60 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl hover:shadow-2xl transition-all duration-500 bg-blue-50 rounded-[3rem] relative overflow-hidden ${visibleSections.about ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}>
            {/* Decorative circles inside card */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-200/30 rounded-full blur-3xl"></div>
            
            <CardContent className="p-8 md:p-12 space-y-6 relative z-10">
              <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInDown' : 'opacity-0 translate-y-4'}`}>
                  About ERManager Consulting Services
                </h2>
                <div className={`w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-8 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-x-4'}`}></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`space-y-4 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-x-4'}`}>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    ERManager consulting services is a sub-system of SAP-based SNS designed to simplify internal workforce management. 
                    It integrates attendance tracking and ticket-based task workflows in one secure portal.
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">SAP Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Secure Portal</span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex justify-center transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInRight' : 'opacity-0 translate-x-4'}`}>
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center shadow-lg animate__animated animate__pulse animate__infinite">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate__animated animate__bounce animate__infinite">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    {/* Additional decorative elements */}
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate__animated animate__pulse animate__infinite" style={{ animationDelay: '0.5s' }}>
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-1/2 -right-4 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center animate__animated animate__bounce animate__infinite" style={{ animationDelay: '1s' }}>
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
          <Card className={`bg-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] border-border/60 ${visibleSections.footer ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-8 md:p-12 pb-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={ERManagerLogo} 
                      alt="ERManager Consulting Services" 
                      className="h-8 w-auto object-contain -ml-4"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-md md:whitespace-nowrap">
                    Seamless Ticketing, Smarter Support transform the way you manage support
                  </p>
                </div>
                
                <div className="space-y-4 text-left md:ml-60 ml-0">
                  <h3 className="font-semibold text-foreground">Contact Us</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div>
                      <p className="break-all">
                        <span className="font-semibold text-foreground">Website: </span>
                        <a href="https://ermanagercs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors break-all">
                          https://ermanagercs.com/
                        </a>
                      </p>
                      <p className="mt-3">
                        <span className="font-semibold text-foreground">Phone: </span>
                        <a href="tel:+923352828371" className="text-blue-600 hover:text-blue-700 transition-colors">
                          +923352828371
                        </a>
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Head Office Address</h4>
                      <p className="break-words">
                        Plot# 225/1/ P.E.C.H.S Block 2, Karachi, Sindh,<br />
                        Pakistan.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Days Open</h4>
                      <p className="break-words">Monday to Friday 9:00 am to 6:00 pm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border/30 mt-auto">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-500 text-xs">
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
    </div>
    </>
  );
};

export default Landing;