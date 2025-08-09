import { useState, useEffect, useRef } from 'react';
import { 
  Beaker, 
  Zap, 
  Cpu, 
  Database, 
  Palette, 
  Code, 
  Globe, 
  Wrench, 
  Brain, 
  Layers, 
  Target, 
  Activity,
  FlaskConical,
  Microscope,
  TestTube,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Settings,
  Monitor
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [hoveredBeaker, setHoveredBeaker] = useState(null);
  const [isLabRunning, setIsLabRunning] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [labTemperature, setLabTemperature] = useState(75);
  const [bubbleAnimation, setBubbleAnimation] = useState(true);
  const sectionRef = useRef(null);

  const skillLaboratory = {
    frontend: {
      name: 'Frontend Chemistry Lab',
      color: '#3B82F6',
      glowColor: '#60A5FA',
      icon: FlaskConical,
      description: 'Where beautiful interfaces are crafted',
      equipment: 'Beaker Set A',
      experiments: [
        {
          name: 'HTML5',
          type: 'Base Solution',
          level: 95,
          years: 1,
          projects: 5,
          icon: Code,
          color: '#FF6B35',
          reaction: 'Stable foundation reaction',
          formula: 'C₁₂H₁₅N₃O₃',
          bubbleSpeed: 2,
          glowIntensity: 95,
          description: 'The fundamental building blocks of web structure'
        },
        {
          name: 'CSS3',
          type: 'Styling Compound',
          level: 92,
          years: 1,
          projects: 5,
          icon: Palette,
          color: '#4285F4',
          reaction: 'Visual transformation',
          formula: 'C₈H₁₁NO₂',
          bubbleSpeed: 1.8,
          glowIntensity: 92,
          description: 'Creates beautiful visual transformations'
        },
        {
          name: 'JavaScript',
          type: 'Dynamic Catalyst',
          level: 85,
          years: 1,
          projects: 5,
          icon: Zap,
          color: '#F7DF1E',
          reaction: 'Interactive synthesis',
          formula: 'C₁₀H₁₃N₂O',
          bubbleSpeed: 2.5,
          glowIntensity: 85,
          description: 'Brings life and interactivity to static elements'
        },
        {
          name: 'React.js',
          type: 'Component Matrix',
          level: 82,
          years: 1,
          projects: 5,
          icon: Layers,
          color: '#61DAFB',
          reaction: 'Modular assembly',
          formula: 'C₁₄H₁₈N₂O₅',
          bubbleSpeed: 2.2,
          glowIntensity: 82,
          description: 'Assembles complex interfaces from simple components'
        },
        {
          name: 'Tailwind CSS',
          type: 'Utility Essence',
          level: 90,
          years: 1,
          projects: 5,
          icon: Sparkles,
          color: '#06B6D4',
          reaction: 'Rapid styling',
          formula: 'C₉H₁₂N₂O₃',
          bubbleSpeed: 1.9,
          glowIntensity: 90,
          description: 'Ultra-fast styling reactions'
        }
      ]
    },
    backend: {
      name: 'Backend Processing Unit',
      color: '#10B981',
      glowColor: '#34D399',
      icon: TestTube,
      description: 'Server-side molecular reactions',
      equipment: 'Test Tube Array',
      experiments: [
        {
          name: 'PHP',
          type: 'Server Enzyme',
          level: 80,
          years: 1,
          projects: 5,
          icon: Code,
          color: '#777BB4',
          reaction: 'Backend processing',
          formula: 'C₁₁H₁₄N₂O₄',
          bubbleSpeed: 1.6,
          glowIntensity: 80,
          description: 'Processes server-side logic efficiently'
        },
        {
          name: 'Node.js',
          type: 'Runtime Solution',
          level: 75,
          years: 1,
          projects: 5,
          icon: Cpu,
          color: '#339933',
          reaction: 'Async execution',
          formula: 'C₁₃H₁₆N₃O₂',
          bubbleSpeed: 2.1,
          glowIntensity: 75,
          description: 'Enables JavaScript to run on servers'
        },
        {
          name: 'Express.js',
          type: 'Framework Polymer',
          level: 75,
          years: 1,
          projects: 5,
          icon: Globe,
          color: '#000000',
          reaction: 'Route synthesis',
          formula: 'C₇H₉NO₃',
          bubbleSpeed: 1.7,
          glowIntensity: 75,
          description: 'Creates efficient web application routes'
        },
        {
          name: 'RESTful APIs',
          type: 'Communication Protocol',
          level: 72,
          years: 1,
          projects: 5,
          icon: Activity,
          color: '#FF4500',
          reaction: 'Data exchange',
          formula: 'C₆H₈N₂O₂',
          bubbleSpeed: 1.8,
          glowIntensity: 72,
          description: 'Facilitates seamless data communication'
        }
      ]
    },
    database: {
      name: 'Data Analysis Chamber',
      color: '#8B5CF6',
      glowColor: '#A78BFA',
      icon: Microscope,
      description: 'Data storage and tool synthesis',
      equipment: 'Microscope Station',
      experiments: [
        {
          name: 'MySQL',
          type: 'Relational Compound',
          level: 78,
          years: 1,
          projects: 5,
          icon: Database,
          color: '#4479A1',
          reaction: 'Structured storage',
          formula: 'C₁₂H₁₇N₃O₄',
          bubbleSpeed: 1.5,
          glowIntensity: 78,
          description: 'Organizes data in structured relationships'
        },
        {
          name: 'MongoDB',
          type: 'Document Solution',
          level: 70,
          years: 1,
          projects: 5,
          icon: Layers,
          color: '#47A248',
          reaction: 'Flexible storage',
          formula: 'C₉H₁₁N₂O₃',
          bubbleSpeed: 1.8,
          glowIntensity: 70,
          description: 'Stores data in flexible document format'
        },
        {
          name: 'Git & GitHub',
          type: 'Version Tracker',
          level: 88,
          years: 1,
          projects: 5,
          icon: Code,
          color: '#F05032',
          reaction: 'Change tracking',
          formula: 'C₁₀H₁₂N₂O₃',
          bubbleSpeed: 2.0,
          glowIntensity: 88,
          description: 'Tracks and manages code evolution'
        },
        {
          name: 'VS Code',
          type: 'Development Medium',
          level: 95,
          years: 1,
          projects: 5,
          icon: Monitor,
          color: '#007ACC',
          reaction: 'Code synthesis',
          formula: 'C₁₅H₂₀N₄O₅',
          bubbleSpeed: 2.3,
          glowIntensity: 95,
          description: 'Advanced development environment catalyst'
        }
      ]
    },
    programming: {
      name: 'Algorithm Research Lab',
      color: '#F59E0B',
      glowColor: '#FBBF24',
      icon: Brain,
      description: 'Core programming research facility',
      equipment: 'Neural Network Array',
      experiments: [
        {
          name: 'C',
          type: 'System Base',
          level: 85,
          years: 1,
          projects: 5,
          icon: Cpu,
          color: '#A8B9CC',
          reaction: 'Low-level control',
          formula: 'C₈H₁₀N₂O₂',
          bubbleSpeed: 1.4,
          glowIntensity: 85,
          description: 'Provides direct system-level control'
        },
        {
          name: 'C++',
          type: 'Object Polymer',
          level: 82,
          years: 1,
          projects: 5,
          icon: Layers,
          color: '#00599C',
          reaction: 'Object synthesis',
          formula: 'C₁₁H₁₅N₃O₄',
          bubbleSpeed: 1.6,
          glowIntensity: 82,
          description: 'Builds complex object structures'
        },
        {
          name: 'Python',
          type: 'Versatile Agent',
          level: 75,
          years: 1,
          projects: 5,
          icon: Brain,
          color: '#3776AB',
          reaction: 'Multi-purpose synthesis',
          formula: 'C₉H₁₃N₂O₃',
          bubbleSpeed: 1.9,
          glowIntensity: 75,
          description: 'Adapts to various computational needs'
        },
        {
          name: 'Machine Learning',
          type: 'AI Catalyst',
          level: 65,
          years: 1,
          projects: 5,
          icon: Brain,
          color: '#FF6B6B',
          reaction: 'Intelligence synthesis',
          formula: 'C₂₀H₂₅N₅O₆',
          bubbleSpeed: 2.4,
          glowIntensity: 65,
          description: 'Creates artificial intelligence reactions'
        }
      ]
    }
  };

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

  const getFilteredLabs = () => {
    if (selectedCategory === 'all') {
      return Object.entries(skillLaboratory);
    }
    return Object.entries(skillLaboratory).filter(([key]) => key === selectedCategory);
  };

  const getBubbleCount = (level) => Math.floor(level / 20) + 2;
  const getTemperatureColor = (temp) => {
    if (temp > 80) return '#FF4444';
    if (temp > 60) return '#FFA500';
    if (temp > 40) return '#FFFF00';
    return '#44FF44';
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden min-h-screen"
    >
      {/* Laboratory Environment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Steam Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-8 bg-gradient-to-t from-gray-400/40 to-transparent rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Laboratory Lighting */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Laboratory Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center mb-6">
            <Beaker className="w-12 h-12 text-blue-400 mr-4 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Skill Laboratory
              </span>
            </h2>
            <Microscope className="w-12 h-12 text-purple-400 ml-4 animate-bounce" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Welcome to my interactive skill laboratory where technology meets science
          </p>
        </div>

        {/* Laboratory Control Panel */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Lab Status */}
          <div className="flex items-center space-x-4 bg-gray-800/80 backdrop-blur-md rounded-xl px-6 py-3 border border-gray-600">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLabRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-gray-300 text-sm">Lab Status: {isLabRunning ? 'Active' : 'Paused'}</span>
            </div>
            <button
              onClick={() => setIsLabRunning(!isLabRunning)}
              className="p-1 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {isLabRunning ? <Pause size={16} className="text-gray-300" /> : <Play size={16} className="text-gray-300" />}
            </button>
          </div>

          {/* Temperature Control */}
          <div className="flex items-center space-x-3 bg-gray-800/80 backdrop-blur-md rounded-xl px-6 py-3 border border-gray-600">
            <Activity className="w-5 h-5 text-orange-400" />
            <span className="text-gray-300 text-sm">Temp:</span>
            <input
              type="range"
              min="20"
              max="100"
              value={labTemperature}
              onChange={(e) => setLabTemperature(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm font-bold" style={{ color: getTemperatureColor(labTemperature) }}>
              {labTemperature}°C
            </span>
          </div>

          {/* Lab Sections */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
              }`}
            >
              All Labs
            </button>
            {Object.entries(skillLaboratory).map(([key, lab]) => {
              const IconComponent = lab.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    selectedCategory === key
                      ? 'text-white shadow-lg'
                      : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
                  }`}
                  style={selectedCategory === key ? { 
                    background: `linear-gradient(135deg, ${lab.color}, ${lab.glowColor})`
                  } : {}}
                >
                  <IconComponent size={16} className="mr-2" />
                  {lab.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Laboratory Workstations */}
        <div className={`space-y-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {getFilteredLabs().map(([categoryKey, lab], labIndex) => {
            const LabIcon = lab.icon;
            
            return (
              <div key={categoryKey} className="relative">
                {/* Lab Station Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg animate-pulse"
                      style={{ 
                        background: `linear-gradient(135deg, ${lab.color}, ${lab.glowColor})`,
                        boxShadow: `0 0 30px ${lab.color}40`
                      }}
                    >
                      <LabIcon size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{lab.name}</h3>
                      <p className="text-gray-300">{lab.description}</p>
                      <p className="text-gray-400 text-sm">Equipment: {lab.equipment}</p>
                    </div>
                  </div>
                </div>

                {/* Experiment Containers */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                  {lab.experiments.map((experiment, index) => {
                    const isHovered = hoveredBeaker === `${categoryKey}-${experiment.name}`;
                    const isActive = activeExperiment === `${categoryKey}-${experiment.name}`;
                    const ExperimentIcon = experiment.icon;
                    const bubbleCount = getBubbleCount(experiment.level);
                    
                    return (
                      <div
                        key={experiment.name}
                        className="relative cursor-pointer group"
                        onMouseEnter={() => setHoveredBeaker(`${categoryKey}-${experiment.name}`)}
                        onMouseLeave={() => setHoveredBeaker(null)}
                        onClick={() => setActiveExperiment(isActive ? null : `${categoryKey}-${experiment.name}`)}
                      >
                        {/* Experiment Container */}
                        <div className="relative">
                          {/* Glow Effect */}
                          <div 
                            className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                              isHovered || isActive ? 'scale-110 opacity-60' : 'scale-100 opacity-0'
                            }`}
                            style={{
                              background: `radial-gradient(circle, ${experiment.color}40, transparent)`,
                              filter: 'blur(15px)'
                            }}
                          />
                          
                          {/* Main Beaker */}
                          <div 
                            className={`relative bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 border-2 transition-all duration-500 transform ${
                              isHovered ? 'scale-105 -translate-y-2' : 'scale-100'
                            } ${isActive ? 'ring-4 ring-white/30' : ''}`}
                            style={{
                              borderColor: isHovered || isActive ? experiment.color : '#374151',
                              boxShadow: isHovered || isActive 
                                ? `0 20px 40px ${experiment.color}30, inset 0 0 20px ${experiment.color}20`
                                : '0 10px 30px rgba(0,0,0,0.3)'
                            }}
                          >
                            {/* Experiment Label */}
                            <div className="text-center mb-4">
                              <div 
                                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2"
                                style={{ backgroundColor: `${experiment.color}20` }}
                              >
                                <ExperimentIcon size={24} style={{ color: experiment.color }} />
                              </div>
                              <h4 className="text-lg font-bold text-white">{experiment.name}</h4>
                              <p className="text-xs text-gray-400">{experiment.type}</p>
                            </div>

                            {/* Liquid Level Indicator */}
                            <div className="relative h-32 bg-gray-700 rounded-2xl overflow-hidden mb-4">
                              <div 
                                className="absolute bottom-0 left-0 w-full transition-all duration-1000 ease-out"
                                style={{
                                  height: `${experiment.level}%`,
                                  background: `linear-gradient(0deg, ${experiment.color}, ${experiment.color}80)`,
                                  opacity: 0.8
                                }}
                              />
                              
                              {/* Bubbles */}
                              {isLabRunning && bubbleAnimation && [...Array(bubbleCount)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute rounded-full opacity-60"
                                  style={{
                                    width: `${4 + Math.random() * 8}px`,
                                    height: `${4 + Math.random() * 8}px`,
                                    backgroundColor: experiment.color,
                                    left: `${10 + Math.random() * 80}%`,
                                    bottom: `${Math.random() * experiment.level}%`,
                                    animation: `bubble-float ${1 + Math.random() * 2}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`
                                  }}
                                />
                              ))}

                              {/* Level Indicator */}
                              <div className="absolute top-2 right-2 text-xs text-white font-bold">
                                {experiment.level}%
                              </div>
                            </div>

                            {/* Chemical Formula */}
                            <div className="text-center mb-3">
                              <p className="text-xs text-gray-300 font-mono">{experiment.formula}</p>
                              <p className="text-xs text-gray-400">{experiment.reaction}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 text-center">
                              <div className="bg-gray-700/50 rounded-lg p-2">
                                <div className="text-sm font-bold text-white">{experiment.years}</div>
                                <div className="text-xs text-gray-400">Years</div>
                              </div>
                              <div className="bg-gray-700/50 rounded-lg p-2">
                                <div className="text-sm font-bold text-white">{experiment.projects}</div>
                                <div className="text-xs text-gray-400">Projects</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Information Panel */}
                        {isActive && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50">
                            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-600 min-w-max max-w-sm">
                              <div className="flex items-center mb-4">
                                <ExperimentIcon size={24} style={{ color: experiment.color }} className="mr-3" />
                                <div>
                                  <h5 className="text-lg font-bold text-white">{experiment.name}</h5>
                                  <p className="text-sm text-gray-300">{experiment.type}</p>
                                </div>
                              </div>
                              
                              <p className="text-gray-300 text-sm mb-4">{experiment.description}</p>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-400 text-sm">Formula:</span>
                                  <span className="text-white text-sm font-mono">{experiment.formula}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400 text-sm">Reaction:</span>
                                  <span className="text-white text-sm">{experiment.reaction}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400 text-sm">Stability:</span>
                                  <span className="text-white text-sm">{experiment.level}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Laboratory Summary */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
              <Settings className="mr-3" size={28} />
              Laboratory Analysis Complete
            </h3>
            <p className="text-gray-300 mb-6">
              All experiments are stable and ready for production deployment
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {Object.entries(skillLaboratory).map(([key, lab]) => {
                const avgLevel = Math.round(lab.experiments.reduce((acc, exp) => acc + exp.level, 0) / lab.experiments.length);
                const LabIcon = lab.icon;
                
                return (
                  <div key={key} className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${lab.color}20` }}
                    >
                      <LabIcon size={32} style={{ color: lab.color }} />
                    </div>
                    <h4 className="text-lg font-bold text-white">{lab.name.split(' ')[0]}</h4>
                    <p className="text-sm text-gray-400 mb-2">{lab.experiments.length} experiments</p>
                    <div className="text-2xl font-bold" style={{ color: lab.color }}>
                      {avgLevel}%
                    </div>
                    <div className="text-xs text-gray-400">Avg Stability</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            🧪 Hover over experiments to see reactions • 🔬 Click for detailed analysis • ⚗️ Adjust lab conditions
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes bubble-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
