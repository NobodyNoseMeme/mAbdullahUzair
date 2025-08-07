import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Star, Calendar, Play, Pause, Code, Sparkles, Zap, Box } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Projects3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const projects = [
    {
      title: 'MacroMate',
      description: 'AI-powered health and fitness web application designed as my Final Year Project. Features intelligent meal recommendations and comprehensive nutrition tracking with machine learning algorithms.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI/ML', 'Express.js', 'Python'],
      features: [
        'AI-powered meal recommendations',
        'Real-time nutrition tracking',
        'Progress visualization',
        'Personalized fitness plans',
        'Machine learning algorithms'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'In Development',
      rating: 4.8,
      year: '2024',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      category: 'Full Stack AI'
    },
    {
      title: 'XRevStudio.com',
      description: 'Portfolio website for a creative studio built during internship at Levelup Solutions. Focused on cross-browser compatibility and mobile responsiveness with modern UI/UX.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'SEO'],
      features: [
        'Responsive design',
        'Cross-browser compatibility',
        'Interactive portfolio gallery',
        'Contact form integration',
        'SEO optimized structure'
      ],
      liveUrl: 'https://xrevstudio.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.6,
      year: '2024',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      category: 'Professional Web'
    },
    {
      title: 'ObecheInterior.com',
      description: 'Visually appealing landing page for an interior design company. Designed and developed during internship with focus on modern aesthetics and user experience.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      features: [
        'Modern design aesthetics',
        'Smooth animations',
        'Gallery showcase',
        'Service descriptions',
        'Mobile optimization'
      ],
      liveUrl: 'https://obecheinterior.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      category: 'Landing Page'
    },
    {
      title: 'LevelUpSol.com.pk',
      description: 'Company website for a software agency. Contributed to UI/UX enhancements and page optimization for better performance and user engagement.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'SEO'],
      features: [
        'UI/UX enhancements',
        'Page optimization',
        'Service portfolio',
        'Team showcase',
        'Performance optimized'
      ],
      liveUrl: 'https://levelupsol.com.pk',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.5,
      year: '2024',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      category: 'Corporate Web'
    },
    {
      title: 'CricketX.net',
      description: 'Cricket website developed during internship at Levelup Solutions. Focused on layout design, responsiveness, and sports content management.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      features: [
        'Responsive layout design',
        'Cricket content management',
        'Interactive features',
        'Mobile optimization',
        'Fast loading performance'
      ],
      liveUrl: 'https://cricketx.net',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.4,
      year: '2024',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      category: 'Sports Web'
    },
    {
      title: 'HackerFolio',
      description: 'Amazing hackdesign portfolio site with modern UI/UX and innovative design patterns. Showcases advanced React development skills.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      features: [
        'Modern hack design aesthetics',
        'Interactive animations',
        'Dark/Light theme toggle',
        'Responsive layout',
        'Performance optimized'
      ],
      liveUrl: 'https://abdullahcodes.vercel.app/',
      githubUrl: 'https://github.com/mabdullahuzair/HackerFolio',
      status: 'Completed',
      rating: 4.9,
      year: '2024',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      category: 'Portfolio'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse tracking for 3D perspective effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (carouselRef.current && !isDragging) {
        const rect = carouselRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = ((e.clientX - centerX) / rect.width) * 30; // Reduced range
        const mouseY = ((e.clientY - centerY) / rect.height) * 15; // Reduced range
        setMousePosition({ x: mouseX, y: mouseY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  // Drag functionality
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (carouselRef.current?.contains(e.target)) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setLastRotation(rotation);
        setIsAutoPlaying(false);
        e.preventDefault();
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const newRotation = lastRotation + (deltaX * 0.5); // Sensitivity adjustment
        setRotation(newRotation);
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Snap to nearest project
        const snapAngle = Math.round((rotation || 0) / 60) * 60;
        const targetProject = Math.abs(Math.round((rotation || 0) / 60)) % projects.length;
        setRotation(snapAngle);
        setCurrentProject(targetProject);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, rotation, lastRotation, projects.length]);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRotation(prev => (prev || 0) - 60); // 360 / 6 projects = 60 degrees per project
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 600);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setRotation(prev => (prev || 0) + 60);
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      setIsTransitioning(false);
    }, 600);
  };

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return;
    setIsTransitioning(true);
    const direction = index > currentProject ? -1 : 1;
    const steps = Math.abs(index - currentProject);
    setRotation(prev => prev + (direction * steps * 60));
    setTimeout(() => {
      setCurrentProject(index);
      setIsTransitioning(false);
    }, 600);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextProject();
      }, 4000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-pulse blur-xl"/>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-pulse blur-xl" style={{animationDelay: '1s'}}/>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse blur-xl" style={{animationDelay: '2s'}}/>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${(Math.random() * 100).toFixed(1)}%`,
              top: `${(Math.random() * 100).toFixed(1)}%`,
              animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
              animationDuration: `${(2 + Math.random() * 3).toFixed(2)}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6">
            <Box className="w-8 h-8 text-purple-600 mr-3 animate-spin"/>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Project Showcase
            </h2>
            <Box className="w-8 h-8 text-blue-600 ml-3 animate-spin" style={{animationDelay: '0.5s'}}/>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
            Innovative solutions crafted with cutting-edge technologies and creative design
          </p>
        </div>

        {/* 3D Cube Carousel Container */}
        <div 
          ref={carouselRef}
          className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Main 3D Carousel */}
          <div className="relative w-full h-[600px] mx-auto flex items-center justify-center perspective-1000">
            <div
              className={`relative w-56 h-56 transition-transform duration-700 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation || 0}deg) rotateX(${(mousePosition.y || 0) * 0.5}deg) rotateZ(${(mousePosition.x || 0) * 0.2}deg)`
              }}
            >
              {projects.map((project, index) => {
                const angle = (index * 60) * (Math.PI / 180); // 60 degrees between cards
                const radius = 280; // Further reduced radius for smaller cards
                const x = isNaN(Math.sin(angle)) ? 0 : Math.sin(angle) * radius;
                const z = isNaN(Math.cos(angle)) ? 0 : Math.cos(angle) * radius;
                const isActive = index === currentProject;

                return (
                  <div
                    key={index}
                    className={`absolute w-56 h-72 transition-all duration-700 cursor-pointer group ${isActive ? 'z-30' : 'z-10'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{
                      transform: `translateX(${(x || 0).toFixed(2)}px) translateZ(${(z || 0).toFixed(2)}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => goToProject(index)}
                  >
                    {/* Project Card with proper face orientation */}
                    <div 
                      className={`w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-500 ${
                        isActive ? 'border-purple-500 scale-110' : 'border-gray-200 dark:border-gray-700 scale-95'
                      } ${hoveredCard === index ? 'scale-105' : ''}`}
                      style={{
                        boxShadow: isActive 
                          ? '0 25px 50px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.1)' 
                          : '0 15px 30px rgba(0,0,0,0.2)',
                        transform: `rotateY(${((angle * (180 / Math.PI)) || 0).toFixed(2)}deg)` // Always face forward
                      }}
                    >
                      {/* Project Image/Preview */}
                      <div className="relative h-40 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                        
                        {/* Content overlay */}
                        <div className="absolute inset-0 flex items-center justify-center text-white p-4">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                              <Eye size={32} />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                            <p className="text-sm opacity-90">{project.category}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                            project.status === 'Completed' 
                              ? 'bg-green-500/80 text-white' 
                              : 'bg-yellow-500/80 text-black'
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-semibold">{project.rating}</span>
                        </div>

                        {/* Year */}
                        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                          <Calendar size={14} className="text-white" />
                          <span className="text-white text-sm font-semibold">{project.year}</span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Key Features */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500"/>
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-gray-600 dark:text-gray-100 flex items-center">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-500"/>
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Glow effect for active card */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50 blur-xl transform scale-110 pointer-events-none"/>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8">
            <button
              onClick={prevProject}
              disabled={isTransitioning}
              className="w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
            >
              <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-8">
            <button
              onClick={nextProject}
              disabled={isTransitioning}
              className="w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
            >
              <ChevronRight size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </button>
          </div>

          {/* Auto-play Control */}
          <div className="absolute bottom-8 right-8">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700"
            >
              {isAutoPlaying ? (
                <Pause size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              ) : (
                <Play size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`relative transition-all duration-300 ${
                index === currentProject
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400 rounded-full hover:scale-125'
              }`}
            >
              {index === currentProject && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"/>
              )}
            </button>
          ))}
        </div>

        {/* Current Project Details Panel */}
        <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mr-3">
                    {projects[currentProject].title}
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {projects[currentProject].category}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {projects[currentProject].description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-500"/>
                    All Features
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {projects[currentProject].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentProject].technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(projects[currentProject].liveUrl, '_blank')}
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Live Project
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(projects[currentProject].githubUrl, '_blank')}
                >
                  <Github size={20} className="mr-2" />
                  View Source Code
                </Button>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">{projects[currentProject].rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{projects[currentProject].year}</div>
                    <div className="text-xs text-gray-500">Year</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{projects[currentProject].status === 'Completed' ? '✓' : '⚡'}</div>
                    <div className="text-xs text-gray-500">{projects[currentProject].status}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-playing indicator */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}/>
            {isAutoPlaying ? 'Auto-rotating every 4 seconds' : 'Auto-rotation paused'}
          </span>
        </div>
      </div>

      {/* Custom CSS for 3D perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Projects3D;
