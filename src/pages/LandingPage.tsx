import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Zap, BarChart3, Users, Calendar, AlertTriangle, UserCheck, FileText, MessageSquare, CheckCircle, Timer, Check } from "lucide-react";
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
    footer: false
  });

  // Refs for each section
  //refs for each section used 
  const highlightsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const aboutRef = useRef(null);
  const footerRef = useRef(null);
  
  const fullText = "One Work Platform To Manage Attendance & Tasks Effortlessly";
  const words = fullText.split(' ');

  useEffect(() => {
    let currentIndex = 0;
    const revealSpeed = 200; 

    const revealInterval = setInterval(() => {
      if (currentIndex <= words.length) {
        setVisibleWords(currentIndex);
        currentIndex++;
      } else {
        clearInterval(revealInterval);
      }
    }, revealSpeed);

    return () => clearInterval(revealInterval);
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
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-6x6 mx-auto -mt-20">
          <Card className="bg-blue-50 rounded-[3rem] shadow-none">
            <CardContent className="p-12 md:p-16">
              {/* Hero Section */}
              <div className="text-center space-y-8 mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin leading-tight min-h-[200px] flex items-center justify-center text-center" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 200 }}>
                  <span className="reveal-text">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className={`reveal-word ${index < visibleWords ? 'visible' : ''}`}
                        style={{ 
                          transitionDelay: `${index * 0.1}s`,
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
                  <p className="md:whitespace-nowrap">
                  Seamless Ticketing, Smarter Support
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/login">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-base font-medium rounded-full inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Enter Dashboard
                        <span className="ml-2 text-xl ml-[-2px]">→</span>
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
              <div className="max-w-5xl mx-auto mt-16">
                <div className="rounded-2xl p-4 md:p-12">
                  {/* Mobile Layout - Stacked */}
                  <div className="block md:hidden space-y-6">
                    {/* Dashboard Preview Image */}
                    <div className="w-full aspect-video rounded-xl border border-border/40 overflow-hidden">
                      <img 
                        src={activePreview} 
                        alt="Dashboard Preview" 
                        className="w-full h-full object-contain rounded-xl transition-all duration-500"
                      />
                    </div>

                    {/* Options Card - Full Width on Mobile */}
                    <div className="w-full bg-white shadow-2xl border border-gray-200 rounded-xl">
                      <div className="p-4">
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
                              <div className={`aspect-square rounded-md border-2 flex flex-col items-center justify-center p-1 transition-all duration-200 ${
                                selectedOption === index 
                                  ? 'border-orange-300 bg-orange-50' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}>
                                {}
                                <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border border-gray-300 rounded-sm bg-white flex items-center justify-center">
                                  {selectedOption === index && (
                                    <Check className="w-1.5 h-1.5 text-gray-800" strokeWidth={3} />
                                  )}
                                </div>
                                
                                {/* Icon */}
                                <div className="flex-1 flex items-center justify-center mt-0.5">
                                  <option.icon className={`w-3 h-3 transition-colors ${
                                    selectedOption === index ? 'text-gray-800' : 'text-gray-601'
                                  }`} />
                                </div>
                                
                                {/* Label */}
                                { /*test update */}
                                <span className={`text-[10px] font-medium text-center leading-tight px-0.5 ${
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
                    <div className="w-full aspect-video rounded-xl border border-border/40 flex items-center justify-center relative overflow-visible">
                      <img 
                        src={activePreview} 
                        alt="Dashboard Preview" 
                        className="w-full h-full object-contain rounded-xl transition-all duration-500 translate-x-[-100px]"
                      />

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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="container mx-auto px-6 py-16" ref={whoWeAreRef} data-section="whoWeAre">
        <div className="max-w-6xl mx-auto">
          <Card className={`bg-gradient-to-br from-slate-50 to-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[3rem] border-border/60 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="text-center">
                <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInDown' : 'opacity-0 translate-y-4'}`}>
                  Who We Are
                </h2>
                <div className={`w-24 h-1 bg-gradient-to-r from-slate-500 to-gray-600 mx-auto mb-8 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-x-4'}`}></div>
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
                
                <div className={`flex justify-center mt-8 transition-all duration-1000 ${visibleSections.whoWeAre ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-4'}`}>
                  <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate__animated animate__pulse animate__infinite"></div>
                    <span className="text-sm font-medium text-gray-700">Empowering Business Excellence</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16" ref={aboutRef} data-section="about">
        <div className="max-w-6x6 mx-auto -mt-20">
          <Card className={`border-border/60 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl hover:shadow-2xl transition-all duration-500 bg-blue-50 rounded-[3rem] shadow-none ${visibleSections.about ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-8 md:p-12 space-y-6">
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
                  </div>
                </div>
              </div>
              
              <div className={`text-center mt-8 transition-all duration-1000 ${visibleSections.about ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-4'}`}>
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate__animated animate__pulse animate__infinite"></div>
                  <span className="text-sm font-medium text-gray-700">Streamlining Workforce Management</span>
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