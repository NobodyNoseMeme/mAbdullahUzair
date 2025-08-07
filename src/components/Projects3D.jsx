import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Star, Calendar, Play, Pause, Code, Sparkles, Zap, Box } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Projects3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

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

  const projects = [
    {
      title: 'MacroMate',
      description: 'AI-powered health and fitness web application designed as my Final Year Project. Features intelligent meal recommendations and comprehensive nutrition tracking.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI/ML', 'Express.js'],
      features: [
        'AI-powered meal recommendations',
        'Real-time nutrition tracking',
        'Progress visualization',
        'Personalized fitness plans',
        'Social sharing capabilities'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'In Development',
      rating: 4.8,
      year: '2024',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      category: 'Full Stack'
    },
    {
      title: 'XRevStudio.com',
      description: 'Portfolio website for a creative studio with focus on cross-browser compatibility and mobile responsiveness.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP'],
      features: [
        'Responsive design',
        'Cross-browser compatibility',
        'Interactive portfolio gallery',
        'Contact form integration',
        'SEO optimized'
      ],
      liveUrl: 'https://xrevstudio.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.6,
      year: '2024',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      category: 'Frontend'
    },
    {
      title: 'HackerFolio',
      description: 'Amazing hackdesign portfolio site with modern UI/UX and innovative design patterns.',
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
    },
    {
      title: 'Talha Portfolio',
      description: 'Portfolio site in React and Tailwind with clean design and smooth animations.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'CSS3'],
      features: [
        'Clean responsive design',
        'Smooth scroll animations',
        'Modern UI components',
        'Mobile optimized',
        'Fast performance'
      ],
      liveUrl: '#',
      githubUrl: 'https://github.com/NobodyNoseMeme/Talha-Portfolio',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      category: 'Portfolio'
    },
    {
      title: 'SignalForge',
      description: 'SEO helping tool which can create listing automatically with advanced optimization features.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'SEO Tools', 'API Integration'],
      features: [
        'Automatic listing creation',
        'SEO optimization',
        'Analytics dashboard',
        'Keyword research',
        'Performance tracking'
      ],
      liveUrl: 'https://signalforge.floot.app',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.8,
      year: '2024',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      category: 'SaaS Tool'
    },
    {
      title: 'ObecheInterior.com',
      description: 'Visually appealing landing page for an interior design company with modern design aesthetics and smooth animations.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      features: [
        'Modern design aesthetics',
        'Smooth animations',
        'Gallery showcase',
        'Service descriptions',
        'Contact integration'
      ],
      liveUrl: 'https://obecheinterior.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      category: 'Landing Page'
    }
  ];

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject(index);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
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
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Innovative solutions crafted with cutting-edge technologies and creative design
          </p>
        </div>

        {/* Simple Card Grid with 3D Hover Effects - No Complex 3D Transforms */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Featured Project Display */}
          <div className="relative max-w-6xl mx-auto mb-12">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              
              {/* Project Content */}
              <div className="relative">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ease-in-out ${
                      index === currentProject 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Project Preview */}
                      <div className="lg:w-1/2 h-64 lg:h-80 relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                        
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-pulse"/>
                        </div>
                        
                        {/* Content overlay */}
                        <div className="absolute inset-0 flex items-center justify-center text-white p-6">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                              <Eye size={40} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <p className="text-lg opacity-90">{project.category}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-4 py-2 text-sm font-bold rounded-full backdrop-blur-sm ${
                            project.status === 'Completed' 
                              ? 'bg-green-500/90 text-white' 
                              : 'bg-yellow-500/90 text-black'
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-bold">{project.rating}</span>
                        </div>

                        {/* Year */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                          <Calendar size={16} className="text-white" />
                          <span className="text-white text-sm font-bold">{project.year}</span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Key Features */}
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Sparkles className="w-5 h-5 mr-2 text-purple-500"/>
                              Key Features
                            </h4>
                            <ul className="space-y-2">
                              {project.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-gray-600 dark:text-gray-300 flex items-center">
                                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Code className="w-5 h-5 mr-2 text-blue-500"/>
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => window.open(project.liveUrl, '_blank')}
                          >
                            <ExternalLink size={20} className="mr-2" />
                            Live Demo
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="flex-1 border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                            onClick={() => window.open(project.githubUrl, '_blank')}
                          >
                            <Github size={20} className="mr-2" />
                            View Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevProject}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
              >
                <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              </button>
              
              <button
                onClick={nextProject}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
              >
                <ChevronRight size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              </button>

              {/* Auto-play Control */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700"
              >
                {isAutoPlaying ? (
                  <Pause size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
                ) : (
                  <Play size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Project Thumbnails Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`relative group transition-all duration-300 transform hover:scale-105 ${
                  index === currentProject ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                <div className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  index === currentProject 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h4 className="text-white text-xs font-bold text-center px-2">
                      {project.title}
                    </h4>
                  </div>
                  {index === currentProject && (
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`relative transition-all duration-300 ${
                  index === currentProject
                    ? 'w-8 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400 rounded-full hover:scale-125'
                }`}
              >
                {index === currentProject && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"/>
                )}
              </button>
            ))}
          </div>

          {/* Auto-playing indicator */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}/>
              {isAutoPlaying ? 'Auto-rotating every 4 seconds' : 'Auto-rotation paused'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects3D;
