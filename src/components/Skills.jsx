import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Play, Pause, RotateCcw, Zap, Star, Trophy, Target, Code, Database, Palette, Cpu, Globe, Wrench, Brain, Layers, Sparkles, Eye, ArrowRight } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeConstellation, setActiveConstellation] = useState('all');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [viewMode, setViewMode] = useState('constellation'); // constellation, grid, timeline
  const [particles, setParticles] = useState([]);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const skillConstellations = {
    frontend: {
      name: 'Frontend Galaxy',
      color: '#3B82F6',
      icon: Palette,
      center: { x: 200, y: 150 },
      skills: [
        { 
          name: 'HTML5', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Code,
          position: { x: 200, y: 100 },
          connections: ['CSS3', 'JavaScript'],
          description: 'Semantic markup and accessibility'
        },
        { 
          name: 'CSS3', 
          level: 92, 
          years: 1, 
          projects: 5, 
          icon: Palette,
          position: { x: 150, y: 180 },
          connections: ['HTML5', 'Tailwind CSS', 'Bootstrap'],
          description: 'Advanced styling and animations'
        },
        { 
          name: 'JavaScript', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Zap,
          position: { x: 280, y: 120 },
          connections: ['HTML5', 'React.js'],
          description: 'Modern ES6+ and DOM manipulation'
        },
        { 
          name: 'React.js', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          position: { x: 320, y: 200 },
          connections: ['JavaScript'],
          description: 'Component-based architecture'
        },
        { 
          name: 'Tailwind CSS', 
          level: 90, 
          years: 1, 
          projects: 5, 
          icon: Sparkles,
          position: { x: 120, y: 240 },
          connections: ['CSS3'],
          description: 'Utility-first CSS framework'
        },
        { 
          name: 'Bootstrap', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          position: { x: 240, y: 260 },
          connections: ['CSS3'],
          description: 'Responsive component library'
        }
      ]
    },
    backend: {
      name: 'Backend Universe',
      color: '#10B981',
      icon: Database,
      center: { x: 600, y: 150 },
      skills: [
        { 
          name: 'PHP', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Code,
          position: { x: 550, y: 100 },
          connections: ['MySQL', 'RESTful APIs'],
          description: 'Server-side scripting'
        },
        { 
          name: 'Node.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          position: { x: 650, y: 120 },
          connections: ['Express.js', 'MongoDB'],
          description: 'JavaScript runtime environment'
        },
        { 
          name: 'Express.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Globe,
          position: { x: 700, y: 180 },
          connections: ['Node.js', 'RESTful APIs'],
          description: 'Web framework for Node.js'
        },
        { 
          name: 'RESTful APIs', 
          level: 72, 
          years: 1, 
          projects: 5, 
          icon: ArrowRight,
          position: { x: 580, y: 220 },
          connections: ['PHP', 'Express.js'],
          description: 'API design and development'
        }
      ]
    },
    database: {
      name: 'Data Nebula',
      color: '#8B5CF6',
      icon: Database,
      center: { x: 200, y: 400 },
      skills: [
        { 
          name: 'MySQL', 
          level: 78, 
          years: 1, 
          projects: 5, 
          icon: Database,
          position: { x: 150, y: 350 },
          connections: ['MongoDB', 'Git & GitHub'],
          description: 'Relational database management'
        },
        { 
          name: 'MongoDB', 
          level: 70, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          position: { x: 280, y: 380 },
          connections: ['MySQL', 'Postman'],
          description: 'NoSQL document database'
        },
        { 
          name: 'Git & GitHub', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Code,
          position: { x: 120, y: 450 },
          connections: ['MySQL', 'VS Code'],
          description: 'Version control system'
        },
        { 
          name: 'VS Code', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          position: { x: 220, y: 480 },
          connections: ['Git & GitHub', 'Postman'],
          description: 'Advanced IDE usage'
        },
        { 
          name: 'Postman', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Target,
          position: { x: 320, y: 450 },
          connections: ['MongoDB', 'VS Code'],
          description: 'API testing and documentation'
        }
      ]
    },
    programming: {
      name: 'Code Solar System',
      color: '#F59E0B',
      icon: Brain,
      center: { x: 600, y: 400 },
      skills: [
        { 
          name: 'C', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          position: { x: 550, y: 350 },
          connections: ['C++'],
          description: 'System programming language'
        },
        { 
          name: 'C++', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          position: { x: 650, y: 380 },
          connections: ['C', 'Python'],
          description: 'Object-oriented programming'
        },
        { 
          name: 'Python', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Brain,
          position: { x: 580, y: 480 },
          connections: ['C++', 'Machine Learning'],
          description: 'Versatile programming language'
        },
        { 
          name: 'Machine Learning', 
          level: 65, 
          years: 1, 
          projects: 5, 
          icon: Star,
          position: { x: 700, y: 450 },
          connections: ['Python'],
          description: 'AI and data science'
        }
      ]
    }
  };

  // Create particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx * animationSpeed,
        y: particle.y + particle.vy * animationSpeed,
        x: particle.x < 0 ? 800 : particle.x > 800 ? 0 : particle.x,
        y: particle.y < 0 ? 600 : particle.y > 600 ? 0 : particle.y
      })));
    };

    animationRef.current = setInterval(animate, 16);
    return () => clearInterval(animationRef.current);
  }, [isAnimating, animationSpeed]);

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

  const getAllSkills = () => {
    return Object.values(skillConstellations).flatMap(constellation => 
      constellation.skills.map(skill => ({
        ...skill,
        constellation: constellation.name,
        constellationColor: constellation.color
      }))
    );
  };

  const getSkillsToDisplay = () => {
    if (activeConstellation === 'all') {
      return getAllSkills();
    }
    return skillConstellations[activeConstellation]?.skills.map(skill => ({
      ...skill,
      constellation: skillConstellations[activeConstellation].name,
      constellationColor: skillConstellations[activeConstellation].color
    })) || [];
  };

  const getConnectionOpacity = (skill, connectedSkillName) => {
    if (hoveredSkill === skill.name || hoveredSkill === connectedSkillName) {
      return 0.8;
    }
    return 0.2;
  };

  const getSkillLevelColor = (level) => {
    if (level >= 90) return '#10B981'; // green
    if (level >= 80) return '#3B82F6'; // blue
    if (level >= 70) return '#F59E0B'; // orange
    return '#EF4444'; // red
  };

  const resetView = () => {
    setSelectedSkill(null);
    setHoveredSkill(null);
    setActiveConstellation('all');
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden min-h-screen"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skill Constellations
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Navigate through my technical universe and discover interconnected skills
          </p>
        </div>

        {/* Controls */}
        <div className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Constellation Selector */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveConstellation('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeConstellation === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              🌌 All Constellations
            </button>
            {Object.entries(skillConstellations).map(([key, constellation]) => {
              const IconComponent = constellation.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveConstellation(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    activeConstellation === key
                      ? 'text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  style={activeConstellation === key ? { 
                    background: `linear-gradient(135deg, ${constellation.color}, ${constellation.color}CC)`
                  } : {}}
                >
                  <IconComponent size={16} className="mr-2" />
                  {constellation.name}
                </button>
              );
            })}
          </div>

          {/* Animation Controls */}
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              {isAnimating ? <Pause size={16} className="text-gray-300" /> : <Play size={16} className="text-gray-300" />}
            </button>
            <span className="text-gray-300 text-sm mx-2">Speed:</span>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-20"
            />
            <button
              onClick={resetView}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors duration-200 ml-2"
            >
              <RotateCcw size={16} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Constellation Canvas */}
        <div className={`relative w-full h-[600px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative w-full h-full bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
              {/* Constellation Connections */}
              {getSkillsToDisplay().map(skill => 
                skill.connections?.map(connectionName => {
                  const connectedSkill = getSkillsToDisplay().find(s => s.name === connectionName);
                  if (!connectedSkill) return null;
                  
                  return (
                    <line
                      key={`${skill.name}-${connectionName}`}
                      x1={skill.position.x}
                      y1={skill.position.y}
                      x2={connectedSkill.position.x}
                      y2={connectedSkill.position.y}
                      stroke={skill.constellationColor || '#3B82F6'}
                      strokeWidth={hoveredSkill === skill.name || hoveredSkill === connectionName ? 3 : 1}
                      opacity={getConnectionOpacity(skill, connectionName)}
                      className="transition-all duration-300"
                    />
                  );
                })
              )}

              {/* Skill Nodes */}
              {getSkillsToDisplay().map(skill => {
                const IconComponent = skill.icon;
                const isHovered = hoveredSkill === skill.name;
                const isSelected = selectedSkill?.name === skill.name;
                const nodeSize = isHovered || isSelected ? 60 : 40;
                
                return (
                  <g key={skill.name}>
                    {/* Glow Effect */}
                    {(isHovered || isSelected) && (
                      <circle
                        cx={skill.position.x}
                        cy={skill.position.y}
                        r={nodeSize + 10}
                        fill={skill.constellationColor || getSkillLevelColor(skill.level)}
                        opacity="0.3"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Main Node */}
                    <circle
                      cx={skill.position.x}
                      cy={skill.position.y}
                      r={nodeSize / 2}
                      fill="url(#gradient)"
                      stroke={skill.constellationColor || getSkillLevelColor(skill.level)}
                      strokeWidth={isHovered || isSelected ? 4 : 2}
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                    />
                    
                    {/* Skill Level Ring */}
                    <circle
                      cx={skill.position.x}
                      cy={skill.position.y}
                      r={nodeSize / 2 + 8}
                      fill="none"
                      stroke={skill.constellationColor || getSkillLevelColor(skill.level)}
                      strokeWidth="3"
                      strokeDasharray={`${(skill.level / 100) * 2 * Math.PI * (nodeSize / 2 + 8)} ${2 * Math.PI * (nodeSize / 2 + 8)}`}
                      opacity="0.7"
                      transform={`rotate(-90 ${skill.position.x} ${skill.position.y})`}
                    />
                    
                    {/* Skill Name */}
                    <text
                      x={skill.position.x}
                      y={skill.position.y + nodeSize/2 + 20}
                      textAnchor="middle"
                      fill="white"
                      fontSize={isHovered || isSelected ? "14" : "12"}
                      fontWeight={isHovered || isSelected ? "bold" : "normal"}
                      className="pointer-events-none transition-all duration-300"
                    >
                      {skill.name}
                    </text>
                    
                    {/* Proficiency Badge */}
                    {(isHovered || isSelected) && (
                      <text
                        x={skill.position.x}
                        y={skill.position.y + nodeSize/2 + 35}
                        textAnchor="middle"
                        fill={skill.constellationColor || getSkillLevelColor(skill.level)}
                        fontSize="11"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {skill.level}%
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <div className={`mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedSkill.constellationColor || getSkillLevelColor(selectedSkill.level)}, ${selectedSkill.constellationColor || getSkillLevelColor(selectedSkill.level)}80)`
                    }}
                  >
                    <selectedSkill.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-300">{selectedSkill.description}</p>
                    <p className="text-gray-400 text-sm mt-1">From {selectedSkill.constellation}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedSkill.level}%</div>
                  <div className="text-gray-400 text-sm">Proficiency</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedSkill.years}</div>
                  <div className="text-gray-400 text-sm">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-3 text-green-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedSkill.projects}</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedSkill.connections?.length || 0}</div>
                  <div className="text-gray-400 text-sm">Connections</div>
                </div>
              </div>

              {selectedSkill.connections && selectedSkill.connections.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-purple-400" />
                    Connected Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.connections.map(connection => (
                      <span
                        key={connection}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20"
                      >
                        {connection}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Constellation Stats */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillConstellations).map(([key, constellation]) => {
              const avgLevel = Math.round(constellation.skills.reduce((acc, skill) => acc + skill.level, 0) / constellation.skills.length);
              const IconComponent = constellation.icon;
              
              return (
                <div
                  key={key}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setActiveConstellation(key)}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${constellation.color}40` }}
                    >
                      <IconComponent size={24} style={{ color: constellation.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{constellation.name}</h3>
                      <p className="text-sm text-gray-400">{constellation.skills.length} skills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Average Level:</span>
                    <span className="font-bold" style={{ color: constellation.color }}>{avgLevel}%</span>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${avgLevel}%`,
                        backgroundColor: constellation.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            🖱️ Hover over stars to see connections • 🎯 Click to explore details • 🌌 Select constellations to focus
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
