import { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  RotateCcw, 
  Zap, 
  Star, 
  Trophy, 
  Target, 
  Code, 
  Database, 
  Palette, 
  Cpu, 
  Globe, 
  Wrench, 
  Brain, 
  Layers, 
  Sparkles, 
  Eye, 
  ArrowRight, 
  ToggleLeft,
  ToggleRight,
  Circle,
  Square,
  Play,
  Pause,
  Filter,
  Search
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('complex'); // 'complex' or 'simple'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const sectionRef = useRef(null);

  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      shortName: 'Frontend',
      color: '#8B5CF6',
      darkColor: '#7C3AED',
      icon: Palette,
      description: 'Building beautiful and interactive user interfaces',
      totalSkills: 6,
      skills: [
        { 
          name: 'HTML5', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Semantic markup, accessibility, and modern web standards',
          tags: ['Semantic', 'Accessibility', 'SEO'],
          gradient: 'from-orange-400 to-red-500',
          proficiency: 'Expert'
        },
        { 
          name: 'CSS3', 
          level: 92, 
          years: 1, 
          projects: 5, 
          icon: Palette,
          description: 'Advanced styling, animations, and responsive design',
          tags: ['Animation', 'Flexbox', 'Grid'],
          gradient: 'from-blue-400 to-blue-600',
          proficiency: 'Expert'
        },
        { 
          name: 'JavaScript', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Zap,
          description: 'Modern ES6+, DOM manipulation, and asynchronous programming',
          tags: ['ES6+', 'Async/Await', 'DOM'],
          gradient: 'from-yellow-400 to-orange-500',
          proficiency: 'Advanced'
        },
        { 
          name: 'React.js', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'Component-based architecture and state management',
          tags: ['Hooks', 'Context', 'JSX'],
          gradient: 'from-cyan-400 to-blue-500',
          proficiency: 'Advanced'
        },
        { 
          name: 'Tailwind CSS', 
          level: 90, 
          years: 1, 
          projects: 5, 
          icon: Sparkles,
          description: 'Utility-first CSS framework for rapid development',
          tags: ['Utility-First', 'Responsive', 'Dark Mode'],
          gradient: 'from-teal-400 to-cyan-500',
          proficiency: 'Expert'
        },
        { 
          name: 'Bootstrap', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          description: 'Responsive component library and grid system',
          tags: ['Components', 'Grid', 'Responsive'],
          gradient: 'from-purple-400 to-purple-600',
          proficiency: 'Advanced'
        }
      ]
    },
    backend: {
      name: 'Backend Development',
      shortName: 'Backend',
      color: '#10B981',
      darkColor: '#059669',
      icon: Database,
      description: 'Building robust server-side applications and APIs',
      totalSkills: 4,
      skills: [
        { 
          name: 'PHP', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Server-side scripting and web application development',
          tags: ['OOP', 'MVC', 'Laravel'],
          gradient: 'from-indigo-400 to-purple-500',
          proficiency: 'Advanced'
        },
        { 
          name: 'Node.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          description: 'JavaScript runtime for scalable server applications',
          tags: ['Express', 'Async', 'NPM'],
          gradient: 'from-green-400 to-emerald-500',
          proficiency: 'Proficient'
        },
        { 
          name: 'Express.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Globe,
          description: 'Fast and minimalist web framework for Node.js',
          tags: ['Middleware', 'Routes', 'REST'],
          gradient: 'from-gray-400 to-gray-600',
          proficiency: 'Proficient'
        },
        { 
          name: 'RESTful APIs', 
          level: 72, 
          years: 1, 
          projects: 5, 
          icon: ArrowRight,
          description: 'Designing and building scalable web APIs',
          tags: ['REST', 'JSON', 'HTTP'],
          gradient: 'from-orange-400 to-red-500',
          proficiency: 'Proficient'
        }
      ]
    },
    database: {
      name: 'Database & Tools',
      shortName: 'Database',
      color: '#F59E0B',
      darkColor: '#D97706',
      icon: Database,
      description: 'Data management and development tools expertise',
      totalSkills: 5,
      skills: [
        { 
          name: 'MySQL', 
          level: 78, 
          years: 1, 
          projects: 5, 
          icon: Database,
          description: 'Relational database design and optimization',
          tags: ['SQL', 'Indexing', 'Joins'],
          gradient: 'from-blue-400 to-indigo-500',
          proficiency: 'Proficient'
        },
        { 
          name: 'MongoDB', 
          level: 70, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'NoSQL document database for flexible data storage',
          tags: ['NoSQL', 'Documents', 'Aggregation'],
          gradient: 'from-green-400 to-teal-500',
          proficiency: 'Proficient'
        },
        { 
          name: 'Git & GitHub', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Version control and collaborative development',
          tags: ['Branching', 'Merging', 'CI/CD'],
          gradient: 'from-gray-700 to-gray-900',
          proficiency: 'Advanced'
        },
        { 
          name: 'VS Code', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          description: 'Advanced IDE usage with extensions and shortcuts',
          tags: ['Extensions', 'Debugging', 'Shortcuts'],
          gradient: 'from-blue-500 to-blue-700',
          proficiency: 'Expert'
        },
        { 
          name: 'Postman', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Target,
          description: 'API testing, documentation, and collaboration',
          tags: ['Testing', 'Collections', 'Documentation'],
          gradient: 'from-orange-400 to-red-500',
          proficiency: 'Advanced'
        }
      ]
    },
    programming: {
      name: 'Programming Languages',
      shortName: 'Programming',
      color: '#EF4444',
      darkColor: '#DC2626',
      icon: Brain,
      description: 'Core programming languages and paradigms',
      totalSkills: 4,
      skills: [
        { 
          name: 'C', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          description: 'System programming and memory management',
          tags: ['Pointers', 'Memory', 'Performance'],
          gradient: 'from-gray-500 to-gray-700',
          proficiency: 'Advanced'
        },
        { 
          name: 'C++', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'Object-oriented programming and data structures',
          tags: ['OOP', 'STL', 'Templates'],
          gradient: 'from-blue-500 to-purple-600',
          proficiency: 'Advanced'
        },
        { 
          name: 'Python', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Brain,
          description: 'Versatile language for scripting and data science',
          tags: ['Scripting', 'Libraries', 'Data Science'],
          gradient: 'from-green-400 to-blue-500',
          proficiency: 'Proficient'
        },
        { 
          name: 'Machine Learning', 
          level: 65, 
          years: 1, 
          projects: 5, 
          icon: Star,
          description: 'AI algorithms, model training, and data analysis',
          tags: ['Algorithms', 'Models', 'Data Analysis'],
          gradient: 'from-purple-400 to-pink-500',
          proficiency: 'Learning'
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

  const toggleCardFlip = (skillName) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(skillName)) {
        newSet.delete(skillName);
      } else {
        newSet.add(skillName);
      }
      return newSet;
    });
  };

  const getFilteredSkills = () => {
    let allSkills = [];
    
    if (selectedCategory === 'all') {
      allSkills = Object.values(skillsData).flatMap(category => 
        category.skills.map(skill => ({
          ...skill,
          category: category.name,
          categoryColor: category.color,
          categoryKey: Object.keys(skillsData).find(key => skillsData[key] === category)
        }))
      );
    } else {
      const category = skillsData[selectedCategory];
      allSkills = category.skills.map(skill => ({
        ...skill,
        category: category.name,
        categoryColor: category.color,
        categoryKey: selectedCategory
      }));
    }

    if (searchTerm) {
      allSkills = allSkills.filter(skill => 
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return allSkills;
  };

  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'Expert': return 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30';
      case 'Advanced': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Proficient': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      default: return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    }
  };

  // Complex View: Orbital Skills with Physics
  const ComplexView = () => (
    <div className="space-y-20">
      {Object.entries(skillsData).map(([categoryKey, category], categoryIndex) => {
        if (selectedCategory !== 'all' && selectedCategory !== categoryKey) return null;
        
        const isHovered = hoveredCategory === categoryKey;
        const IconComponent = category.icon;
        const filteredSkills = category.skills.filter(skill => 
          !searchTerm || skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        return (
          <div 
            key={categoryKey}
            className="relative min-h-[500px]"
            onMouseEnter={() => setHoveredCategory(categoryKey)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Center Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div 
                className={`relative transition-all duration-700 transform ${
                  isHovered ? 'scale-125' : 'scale-100'
                }`}
              >
                {/* Glowing Ring */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                    isHovered ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    background: `conic-gradient(from 0deg, ${category.color}40, transparent, ${category.color}40)`,
                    filter: 'blur(8px)',
                    transform: 'scale(1.5)'
                  }}
                />
                
                {/* Main Hub */}
                <div 
                  className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}, ${category.darkColor})`,
                    boxShadow: `0 20px 40px ${category.color}40, inset 0 0 20px rgba(255,255,255,0.1)`
                  }}
                >
                  <IconComponent size={32} className="mb-2" />
                  <div className="text-center">
                    <div className="text-sm font-bold">{category.shortName}</div>
                    <div className="text-xs opacity-80">{filteredSkills.length} skills</div>
                  </div>
                </div>

                {/* Particle Effects */}
                {isHovered && (
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-ping"
                        style={{
                          background: category.color,
                          left: '50%',
                          top: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-80px)`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Orbiting Skills */}
            <div className="relative w-full h-full">
              {filteredSkills.map((skill, index) => {
                const totalSkills = filteredSkills.length;
                const angle = (index / totalSkills) * 2 * Math.PI;
                const orbitRadius = isHovered ? 200 : 180;
                const animationDelay = index * 0.2;
                
                // Multiple orbit layers for visual depth
                const orbitLayer = Math.floor(index / 6) + 1;
                const layerRadius = orbitRadius + (orbitLayer - 1) * 60;
                
                const x = Math.cos(angle + (isAnimating ? Date.now() * 0.001 * animationSpeed : 0)) * layerRadius;
                const y = Math.sin(angle + (isAnimating ? Date.now() * 0.001 * animationSpeed : 0)) * layerRadius;
                
                const SkillIcon = skill.icon;
                const isSelected = selectedSkill?.name === skill.name;
                
                return (
                  <div
                    key={skill.name}
                    className={`absolute transition-all duration-500 cursor-pointer group z-20`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${isHovered ? `scale(1.1)` : 'scale(1)'}`,
                      transitionDelay: `${animationDelay}s`
                    }}
                    onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  >
                    {/* Skill Orb */}
                    <div 
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${skill.gradient} shadow-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-125 ${
                        isSelected ? 'ring-4 ring-white/50 scale-110' : ''
                      }`}
                      style={{
                        boxShadow: isSelected 
                          ? `0 0 30px ${category.color}80, 0 10px 30px rgba(0,0,0,0.3)` 
                          : '0 10px 30px rgba(0,0,0,0.2)'
                      }}
                    >
                      <SkillIcon size={24} className="text-white" />
                      
                      {/* Skill Level Ring */}
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-white/30"
                        style={{
                          background: `conic-gradient(${category.color} ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`
                        }}
                      />
                    </div>

                    {/* Floating Label */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 transition-all duration-300 ${
                      isHovered || isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                      <div className="bg-gray-900/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-xl border border-gray-700 text-center min-w-max">
                        <div className="text-sm font-semibold text-white">{skill.name}</div>
                        <div className="text-xs text-gray-300">{skill.level}% • {skill.proficiency}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getProficiencyColor(skill.proficiency)}`}>
                          {skill.proficiency}
                        </div>
                      </div>
                    </div>

                    {/* Connection Line to Center */}
                    {isHovered && (
                      <div 
                        className="absolute w-0.5 bg-gradient-to-r opacity-30 pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, transparent)`,
                          height: `${layerRadius}px`,
                          left: '50%',
                          top: '50%',
                          transformOrigin: 'top',
                          transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI) + 90}deg)`
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Category Info Panel */}
            {isHovered && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700 text-center min-w-max">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold" style={{ color: category.color }}>
                        {filteredSkills.length}
                      </div>
                      <div className="text-xs text-gray-400">Skills</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: category.color }}>
                        {Math.round(filteredSkills.reduce((acc, skill) => acc + skill.level, 0) / filteredSkills.length)}%
                      </div>
                      <div className="text-xs text-gray-400">Avg Level</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: category.color }}>
                        {filteredSkills.reduce((acc, skill) => acc + skill.projects, 0)}
                      </div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // Simple View: Categorized Flip Cards
  const SimpleView = () => (
    <div className="space-y-12">
      {Object.entries(skillsData).map(([categoryKey, category]) => {
        if (selectedCategory !== 'all' && selectedCategory !== categoryKey) return null;
        
        const filteredSkills = category.skills.filter(skill => 
          !searchTerm || skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (filteredSkills.length === 0) return null;

        const IconComponent = category.icon;
        
        return (
          <div key={categoryKey} className="space-y-6">
            {/* Category Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${category.color}, ${category.darkColor})`
                  }}
                >
                  <IconComponent size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => {
                const isFlipped = flippedCards.has(skill.name);
                const SkillIcon = skill.icon;
                
                return (
                  <div
                    key={skill.name}
                    className="relative h-64 cursor-pointer group perspective-1000"
                    onClick={() => toggleCardFlip(skill.name)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className={`relative w-full h-full transition-transform duration-700 transform-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl backface-hidden bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div 
                          className={`h-32 bg-gradient-to-br ${skill.gradient} relative overflow-hidden`}
                        >
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white rounded-lg rotate-45"></div>
                          </div>
                          
                          {/* Icon */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                              <SkillIcon size={32} className="text-white" />
                            </div>
                          </div>
                          
                          {/* Level Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${getProficiencyColor(skill.proficiency)}`}>
                              {skill.proficiency}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span 
                              className="px-2 py-1 text-xs font-bold rounded-full text-white"
                              style={{ backgroundColor: category.color }}
                            >
                              {category.shortName}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{skill.description}</p>
                          
                          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span>{skill.years} year{skill.years !== 1 ? 's' : ''}</span>
                            <span>{skill.projects} projects</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Proficiency</span>
                              <span className="text-xs font-bold" style={{ color: category.color }}>
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${skill.level}%`,
                                  backgroundColor: category.color
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="text-center text-xs text-gray-400">
                            Click to flip →
                          </div>
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className="absolute inset-0 w-full h-full rounded-2xl backface-hidden rotate-y-180 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: category.color + '20' }}
                            >
                              <SkillIcon size={20} style={{ color: category.color }} />
                            </div>
                          </div>
                          
                          {/* Proficiency Circle */}
                          <div className="flex items-center justify-center mb-4">
                            <div className="relative w-20 h-20">
                              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  stroke="currentColor"
                                  strokeWidth="8"
                                  fill="transparent"
                                  className="text-gray-200 dark:text-gray-700"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="40"
                                  stroke={category.color}
                                  strokeWidth="8"
                                  fill="transparent"
                                  strokeDasharray={`${(skill.level / 100) * 251.2} 251.2`}
                                  className="transition-all duration-1000 ease-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold" style={{ color: category.color }}>
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-1">
                              {skill.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="mt-auto">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-lg font-bold" style={{ color: category.color }}>
                                  {skill.years}
                                </div>
                                <div className="text-xs text-gray-500">Year{skill.years !== 1 ? 's' : ''}</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="text-lg font-bold" style={{ color: category.color }}>
                                  {skill.projects}
                                </div>
                                <div className="text-xs text-gray-500">Projects</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }} />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
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
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my technical expertise through interactive experiences
          </p>
        </div>

        {/* Controls */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3">
            <span className="text-gray-300">Simple</span>
            <button
              onClick={() => setViewMode(viewMode === 'complex' ? 'simple' : 'complex')}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-colors duration-300"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                  viewMode === 'complex' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-gray-300">Complex</span>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All Skills
            </button>
            {Object.entries(skillsData).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center ${
                    selectedCategory === key
                      ? 'text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  style={selectedCategory === key ? { 
                    background: `linear-gradient(135deg, ${category.color}, ${category.darkColor})`
                  } : {}}
                >
                  <IconComponent size={16} className="mr-2" />
                  {category.shortName}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-white placeholder-gray-400"
            />
          </div>

          {/* Animation Controls (Complex View Only) */}
          {viewMode === 'complex' && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3">
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
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            {viewMode === 'complex' 
              ? '🌀 Hover over skill hubs to see orbiting skills • 🎯 Click skills to explore details'
              : '🔄 Click on cards to flip and see detailed information • 📱 Mobile optimized'
            }
          </p>
        </div>

        {/* Skills Content */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {viewMode === 'complex' ? <ComplexView /> : <SimpleView />}
        </div>

        {/* Selected Skill Details (Complex View) */}
        {selectedSkill && viewMode === 'complex' && (
          <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedSkill.gradient} flex items-center justify-center mr-4 shadow-lg`}
                  >
                    <selectedSkill.icon size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-300">{selectedSkill.description}</p>
                    <p className="text-gray-400 text-sm mt-1">From {selectedSkill.category}</p>
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
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${getProficiencyColor(selectedSkill.proficiency)}`}>
                    {selectedSkill.proficiency}
                  </div>
                  <div className="text-gray-400 text-sm mt-2">Level</div>
                </div>
              </div>

              {selectedSkill.tags && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-purple-400" />
                    Technologies & Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Stats Overview */}
        {selectedCategory === 'all' && (
          <div className={`mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillsData).map(([key, category]) => {
                const avgLevel = Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length);
                const IconComponent = category.icon;
                
                return (
                  <div
                    key={key}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedCategory(key)}
                  >
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${category.color}40` }}
                      >
                        <IconComponent size={24} style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{category.shortName}</h3>
                        <p className="text-sm text-gray-400">{category.skills.length} skills</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Average Level:</span>
                      <span className="font-bold" style={{ color: category.color }}>{avgLevel}%</span>
                    </div>
                    
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${avgLevel}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Skills;
