import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Star, Code, Database, Globe, Cpu, Palette, Wrench, Brain, Layers, Rocket } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const sectionRef = useRef(null);
  const skillsContainerRef = useRef(null);

  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      icon: Palette,
      skills: [
        { name: 'HTML5', level: 95, years: 1, projects: 5, icon: Code, description: 'Semantic markup and modern web standards' },
        { name: 'CSS3', level: 92, years: 1, projects: 5, icon: Palette, description: 'Advanced styling, animations & responsive design' },
        { name: 'JavaScript', level: 85, years: 1, projects: 5, icon: Zap, description: 'ES6+, DOM manipulation & modern JS features' },
        { name: 'React.js', level: 82, years: 1, projects: 5, icon: Layers, description: 'Component-based UI development' },
        { name: 'Bootstrap', level: 88, years: 1, projects: 5, icon: Wrench, description: 'Responsive framework expertise' },
        { name: 'Tailwind CSS', level: 90, years: 1, projects: 5, icon: Sparkles, description: 'Utility-first CSS framework' }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      icon: Database,
      skills: [
        { name: 'PHP', level: 80, years: 1, projects: 5, icon: Code, description: 'Server-side scripting & web development' },
        { name: 'Node.js', level: 75, years: 1, projects: 5, icon: Cpu, description: 'Server-side JavaScript runtime' },
        { name: 'Express.js', level: 75, years: 1, projects: 5, icon: Rocket, description: 'Fast web framework for Node.js' },
        { name: 'RESTful APIs', level: 72, years: 1, projects: 5, icon: Globe, description: 'API design & development' }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      icon: Database,
      skills: [
        { name: 'MySQL', level: 78, years: 1, projects: 5, icon: Database, description: 'Relational database management' },
        { name: 'MongoDB', level: 70, years: 1, projects: 5, icon: Layers, description: 'NoSQL document database' },
        { name: 'Git & GitHub', level: 88, years: 1, projects: 5, icon: Code, description: 'Version control & collaboration' },
        { name: 'VS Code', level: 95, years: 1, projects: 5, icon: Wrench, description: 'Advanced IDE usage & extensions' },
        { name: 'Postman', level: 80, years: 1, projects: 5, icon: Zap, description: 'API testing & documentation' }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      icon: Brain,
      skills: [
        { name: 'C', level: 85, years: 1, projects: 5, icon: Cpu, description: 'System programming & algorithms' },
        { name: 'C++', level: 82, years: 1, projects: 5, icon: Rocket, description: 'Object-oriented programming' },
        { name: 'Python', level: 75, years: 1, projects: 5, icon: Brain, description: 'Scripting & data analysis' },
        { name: 'Machine Learning', level: 65, years: 1, projects: 5, icon: Star, description: 'AI algorithms & model training' }
      ]
    }
  };

  // Flatten all skills for 3D sphere
  const allSkills = Object.entries(skillsData).flatMap(([category, data]) => 
    data.skills.map(skill => ({ 
      ...skill, 
      category, 
      categoryColor: data.color,
      categoryIcon: data.icon
    }))
  );

  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  // Mouse tracking for 3D perspective
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (skillsContainerRef.current) {
        const rect = skillsContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = ((e.clientX - centerX) / rect.width) * 100;
        const mouseY = ((e.clientY - centerY) / rect.height) * 100;
        setMousePosition({ x: mouseX, y: mouseY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation phase cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Generate 3D positions for skills in a sphere
  const generateSpherePosition = (index, total, phase) => {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi + (phase * 0.01);
    
    const radius = 200 + Math.sin(phase + index) * 50;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    return { x, y, z };
  };

  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'from-green-400 to-emerald-500';
    if (level >= 80) return 'from-blue-400 to-cyan-500';
    if (level >= 70) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getSkillLevelLabel = (level) => {
    if (level >= 90) return { label: 'Expert', color: 'text-green-600 bg-green-100' };
    if (level >= 80) return { label: 'Advanced', color: 'text-blue-600 bg-blue-100' };
    if (level >= 70) return { label: 'Proficient', color: 'text-orange-600 bg-orange-100' };
    return { label: 'Learning', color: 'text-red-600 bg-red-100' };
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden min-h-screen"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full animate-pulse blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full animate-pulse blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-green-400/20 rounded-full animate-pulse blur-3xl transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Interactive Skills Sphere
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my technical expertise in an immersive 3D environment
          </p>
        </div>

        {/* Controls */}
        <div className={`flex flex-col md:flex-row gap-4 mb-8 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-4 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <option value="all">All Categories</option>
            {Object.entries(skillsData).map(([key, data]) => (
              <option key={key} value={key}>{data.name}</option>
            ))}
          </select>

          {/* Animation Speed Control */}
          <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Speed:</span>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* 3D Skills Sphere */}
        <div 
          ref={skillsContainerRef}
          className={`relative w-full h-[600px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{ perspective: '1000px' }}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1 + animationPhase * 90 * rotationSpeed}deg)`
            }}
          >
            {filteredSkills.map((skill, index) => {
              const position = generateSpherePosition(index, filteredSkills.length, animationPhase);
              const isHovered = hoveredSkill === skill.name;
              const isSelected = selectedSkill?.name === skill.name;
              const IconComponent = skill.icon;
              const levelInfo = getSkillLevelLabel(skill.level);
              
              return (
                <div
                  key={skill.name}
                  className={`absolute cursor-pointer transition-all duration-500 transform hover:scale-125 ${
                    isHovered || isSelected ? 'z-50' : 'z-10'
                  }`}
                  style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                >
                  {/* Skill Orb */}
                  <div 
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${getSkillLevelColor(skill.level)} shadow-2xl flex items-center justify-center group ${
                      isHovered || isSelected ? 'animate-pulse' : ''
                    }`}
                    style={{
                      transform: `rotateY(${-mousePosition.x * 0.1 - animationPhase * 90 * rotationSpeed}deg) rotateX(${-mousePosition.y * 0.1}deg)`,
                      boxShadow: isHovered || isSelected 
                        ? `0 0 30px ${skill.categoryColor}80, 0 0 60px ${skill.categoryColor}40`
                        : `0 10px 30px rgba(0,0,0,0.3)`
                    }}
                  >
                    <IconComponent 
                      size={isHovered || isSelected ? 32 : 24} 
                      className="text-white transition-all duration-300" 
                    />
                    
                    {/* Skill Level Ring */}
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-white/30"
                      style={{
                        background: `conic-gradient(${skill.categoryColor} ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`
                      }}
                    />
                    
                    {/* Pulsing Ring Effect */}
                    {(isHovered || isSelected) && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          background: `radial-gradient(circle, ${skill.categoryColor}40 0%, transparent 70%)`
                        }}
                      />
                    )}
                  </div>

                  {/* Floating Label */}
                  <div 
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${
                      isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{
                      transform: `translate(-50%, 0) rotateY(${-mousePosition.x * 0.1 - animationPhase * 90 * rotationSpeed}deg) rotateX(${-mousePosition.y * 0.1}deg)`
                    }}
                  >
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border border-gray-200 dark:border-gray-700">
                      <div className="text-center">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{skill.name}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${levelInfo.color}`}>
                          {levelInfo.label} - {skill.level}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Skill Details Panel */}
        {selectedSkill && (
          <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getSkillLevelColor(selectedSkill.level)} flex items-center justify-center mr-4 shadow-lg`}
                  >
                    <selectedSkill.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedSkill.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Proficiency */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Proficiency
                  </h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: selectedSkill.categoryColor }}>
                      {selectedSkill.level}%
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelLabel(selectedSkill.level).color}`}>
                      {getSkillLevelLabel(selectedSkill.level).label}
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${selectedSkill.level}%`,
                        background: `linear-gradient(90deg, ${selectedSkill.categoryColor}CC, ${selectedSkill.categoryColor})`
                      }}
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-500" />
                    Experience
                  </h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{selectedSkill.years}</div>
                    <div className="text-gray-600 dark:text-gray-400">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedSkill.projects}</div>
                    <div className="text-gray-600 dark:text-gray-400">Projects</div>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <selectedSkill.categoryIcon className="w-5 h-5 mr-2" style={{ color: selectedSkill.categoryColor }} />
                    Category
                  </h4>
                  <div className="text-center">
                    <div 
                      className="text-xl font-bold mb-2" 
                      style={{ color: selectedSkill.categoryColor }}
                    >
                      {skillsData[selectedSkill.category].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {skillsData[selectedSkill.category].skills.length} skills total
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Overview */}
        <div className={`mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsData).map(([key, data]) => {
              const avgLevel = Math.round(data.skills.reduce((acc, skill) => acc + skill.level, 0) / data.skills.length);
              const IconComponent = data.icon;
              
              return (
                <div
                  key={key}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => setFilterCategory(key)}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${data.color}20` }}
                    >
                      <IconComponent size={24} style={{ color: data.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{data.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{data.skills.length} skills</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average:</span>
                    <span className="font-bold" style={{ color: data.color }}>{avgLevel}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${avgLevel}%`,
                        backgroundColor: data.color
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
          <p className="text-gray-600 dark:text-gray-400">
            🖱️ Move your mouse to rotate the sphere • 🎯 Click on skills to explore details • ⚡ Adjust speed with the slider
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
