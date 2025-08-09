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
  Square
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewMode, setViewMode] = useState('complex'); // 'complex' or 'simple'
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const sectionRef = useRef(null);

  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      icon: Palette,
      description: 'Creating beautiful and interactive user interfaces',
      skills: [
        { 
          name: 'HTML5', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Semantic markup, accessibility, and modern web standards',
          tags: ['Semantic', 'Accessibility', 'SEO'],
          gradient: 'from-orange-400 to-red-500'
        },
        { 
          name: 'CSS3', 
          level: 92, 
          years: 1, 
          projects: 5, 
          icon: Palette,
          description: 'Advanced styling, animations, and responsive design',
          tags: ['Animation', 'Flexbox', 'Grid'],
          gradient: 'from-blue-400 to-blue-600'
        },
        { 
          name: 'JavaScript', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Zap,
          description: 'Modern ES6+, DOM manipulation, and asynchronous programming',
          tags: ['ES6+', 'Async/Await', 'DOM'],
          gradient: 'from-yellow-400 to-orange-500'
        },
        { 
          name: 'React.js', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'Component-based architecture and state management',
          tags: ['Hooks', 'Context', 'JSX'],
          gradient: 'from-cyan-400 to-blue-500'
        },
        { 
          name: 'Tailwind CSS', 
          level: 90, 
          years: 1, 
          projects: 5, 
          icon: Sparkles,
          description: 'Utility-first CSS framework for rapid development',
          tags: ['Utility-First', 'Responsive', 'Dark Mode'],
          gradient: 'from-teal-400 to-cyan-500'
        },
        { 
          name: 'Bootstrap', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          description: 'Responsive component library and grid system',
          tags: ['Components', 'Grid', 'Responsive'],
          gradient: 'from-purple-400 to-purple-600'
        }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      icon: Database,
      description: 'Building robust server-side applications and APIs',
      skills: [
        { 
          name: 'PHP', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Server-side scripting and web application development',
          tags: ['OOP', 'MVC', 'Laravel'],
          gradient: 'from-indigo-400 to-purple-500'
        },
        { 
          name: 'Node.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          description: 'JavaScript runtime for scalable server applications',
          tags: ['Express', 'Async', 'NPM'],
          gradient: 'from-green-400 to-emerald-500'
        },
        { 
          name: 'Express.js', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Globe,
          description: 'Fast and minimalist web framework for Node.js',
          tags: ['Middleware', 'Routes', 'REST'],
          gradient: 'from-gray-400 to-gray-600'
        },
        { 
          name: 'RESTful APIs', 
          level: 72, 
          years: 1, 
          projects: 5, 
          icon: ArrowRight,
          description: 'Designing and building scalable web APIs',
          tags: ['REST', 'JSON', 'HTTP'],
          gradient: 'from-orange-400 to-red-500'
        }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      icon: Database,
      description: 'Data management and development tools expertise',
      skills: [
        { 
          name: 'MySQL', 
          level: 78, 
          years: 1, 
          projects: 5, 
          icon: Database,
          description: 'Relational database design and optimization',
          tags: ['SQL', 'Indexing', 'Joins'],
          gradient: 'from-blue-400 to-indigo-500'
        },
        { 
          name: 'MongoDB', 
          level: 70, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'NoSQL document database for flexible data storage',
          tags: ['NoSQL', 'Documents', 'Aggregation'],
          gradient: 'from-green-400 to-teal-500'
        },
        { 
          name: 'Git & GitHub', 
          level: 88, 
          years: 1, 
          projects: 5, 
          icon: Code,
          description: 'Version control and collaborative development',
          tags: ['Branching', 'Merging', 'CI/CD'],
          gradient: 'from-gray-700 to-gray-900'
        },
        { 
          name: 'VS Code', 
          level: 95, 
          years: 1, 
          projects: 5, 
          icon: Wrench,
          description: 'Advanced IDE usage with extensions and shortcuts',
          tags: ['Extensions', 'Debugging', 'Shortcuts'],
          gradient: 'from-blue-500 to-blue-700'
        },
        { 
          name: 'Postman', 
          level: 80, 
          years: 1, 
          projects: 5, 
          icon: Target,
          description: 'API testing, documentation, and collaboration',
          tags: ['Testing', 'Collections', 'Documentation'],
          gradient: 'from-orange-400 to-red-500'
        }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      icon: Brain,
      description: 'Core programming languages and paradigms',
      skills: [
        { 
          name: 'C', 
          level: 85, 
          years: 1, 
          projects: 5, 
          icon: Cpu,
          description: 'System programming and memory management',
          tags: ['Pointers', 'Memory', 'Performance'],
          gradient: 'from-gray-500 to-gray-700'
        },
        { 
          name: 'C++', 
          level: 82, 
          years: 1, 
          projects: 5, 
          icon: Layers,
          description: 'Object-oriented programming and data structures',
          tags: ['OOP', 'STL', 'Templates'],
          gradient: 'from-blue-500 to-purple-600'
        },
        { 
          name: 'Python', 
          level: 75, 
          years: 1, 
          projects: 5, 
          icon: Brain,
          description: 'Versatile language for scripting and data science',
          tags: ['Scripting', 'Libraries', 'Data Science'],
          gradient: 'from-green-400 to-blue-500'
        },
        { 
          name: 'Machine Learning', 
          level: 65, 
          years: 1, 
          projects: 5, 
          icon: Star,
          description: 'AI algorithms, model training, and data analysis',
          tags: ['Algorithms', 'Models', 'Data Analysis'],
          gradient: 'from-purple-400 to-pink-500'
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

  const getAllSkills = () => {
    return Object.values(skillsData).flatMap(category => 
      category.skills.map(skill => ({
        ...skill,
        category: category.name,
        categoryColor: category.color
      }))
    );
  };

  const getSkillLevelLabel = (level) => {
    if (level >= 90) return { label: 'Expert', color: 'text-emerald-600 bg-emerald-100' };
    if (level >= 80) return { label: 'Advanced', color: 'text-blue-600 bg-blue-100' };
    if (level >= 70) return { label: 'Proficient', color: 'text-orange-600 bg-orange-100' };
    return { label: 'Learning', color: 'text-red-600 bg-red-100' };
  };

  // Complex View: Circular Revolving Skills
  const ComplexView = () => (
    <div className="space-y-16">
      {Object.entries(skillsData).map(([categoryKey, category], categoryIndex) => {
        const isHovered = hoveredCategory === categoryKey;
        const IconComponent = category.icon;
        
        return (
          <div 
            key={categoryKey}
            className="relative"
            onMouseEnter={() => setHoveredCategory(categoryKey)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {/* Category Center */}
            <div className="flex flex-col items-center mb-8">
              <div 
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-all duration-500 transform ${
                  isHovered ? 'scale-110 shadow-2xl' : 'scale-100'
                }`}
                style={{ 
                  background: `linear-gradient(135deg, ${category.color}, ${category.color}CC)`,
                  boxShadow: isHovered ? `0 20px 40px ${category.color}40` : '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <IconComponent size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">{category.description}</p>
            </div>

            {/* Revolving Skills Circle */}
            <div className="relative w-full h-96 flex items-center justify-center">
              <div 
                className="relative w-80 h-80 transition-all duration-1000 ease-out"
                style={{
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {category.skills.map((skill, index) => {
                  const angle = (index / category.skills.length) * 2 * Math.PI;
                  const radius = isHovered ? 140 : 120;
                  const x = Math.cos(angle - Math.PI/2) * radius;
                  const y = Math.sin(angle - Math.PI/2) * radius;
                  const SkillIcon = skill.icon;
                  
                  return (
                    <div
                      key={skill.name}
                      className={`absolute w-20 h-20 transition-all duration-700 cursor-pointer group`}
                      style={{
                        transform: `translate(${x}px, ${y}px) ${isHovered ? `rotate(${(index * 360) / category.skills.length}deg)` : 'rotate(0deg)'}`,
                        transitionDelay: `${index * 100}ms`
                      }}
                      onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                    >
                      <div 
                        className={`w-full h-full rounded-2xl bg-gradient-to-br ${skill.gradient} shadow-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}
                        style={{
                          boxShadow: selectedSkill?.name === skill.name 
                            ? `0 0 30px ${category.color}80` 
                            : '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                      >
                        <SkillIcon size={24} className="text-white" />
                      </div>
                      
                      {/* Skill Name */}
                      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 transition-all duration-300 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{skill.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{skill.level}%</div>
                        </div>
                      </div>

                      {/* Proficiency Ring */}
                      <div 
                        className="absolute inset-0 rounded-2xl border-4 border-white/30"
                        style={{
                          background: `conic-gradient(${category.color} ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Connection Lines */}
            {isHovered && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '120px' }}>
                {category.skills.map((skill, index) => {
                  const angle = (index / category.skills.length) * 2 * Math.PI;
                  const radius = 140;
                  const x = Math.cos(angle - Math.PI/2) * radius + 160;
                  const y = Math.sin(angle - Math.PI/2) * radius + 160;
                  
                  return (
                    <line
                      key={index}
                      x1="160"
                      y1="160"
                      x2={x}
                      y2={y}
                      stroke={category.color}
                      strokeWidth="2"
                      opacity="0.3"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );

  // Simple View: Flip Cards
  const SimpleView = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {getAllSkills().map((skill, index) => {
        const isFlipped = flippedCards.has(skill.name);
        const SkillIcon = skill.icon;
        const levelInfo = getSkillLevelLabel(skill.level);
        
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
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${levelInfo.color}`}>
                      {levelInfo.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{skill.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{skill.years} year{skill.years !== 1 ? 's' : ''}</span>
                    <span>{skill.projects} projects</span>
                  </div>
                  
                  <div className="mt-3 text-center text-xs text-gray-400">
                    Click to flip
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
                      style={{ backgroundColor: skill.categoryColor + '20' }}
                    >
                      <SkillIcon size={20} style={{ color: skill.categoryColor }} />
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
                          stroke={skill.categoryColor}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${(skill.level / 100) * 251.2} 251.2`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: skill.categoryColor }}>
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
                        <div className="text-lg font-bold" style={{ color: skill.categoryColor }}>
                          {skill.years}
                        </div>
                        <div className="text-xs text-gray-500">Year{skill.years !== 1 ? 's' : ''}</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-bold" style={{ color: skill.categoryColor }}>
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
  );

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my technical expertise through interactive experiences
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400">Simple</span>
            <button
              onClick={() => setViewMode(viewMode === 'complex' ? 'simple' : 'complex')}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-colors duration-300"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                  viewMode === 'complex' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-gray-600 dark:text-gray-400">Complex</span>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {viewMode === 'complex' 
              ? '🌀 Hover over categories to see skills revolve in circles'
              : '🔄 Click on cards to flip and see detailed information'
            }
          </p>
        </div>

        {/* Skills Content */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {viewMode === 'complex' ? <ComplexView /> : <SimpleView />}
        </div>

        {/* Selected Skill Details (Complex View) */}
        {selectedSkill && viewMode === 'complex' && (
          <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedSkill.gradient} flex items-center justify-center mr-4 shadow-lg`}
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
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{selectedSkill.level}%</div>
                  <div className="text-gray-600 dark:text-gray-400">Proficiency</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{selectedSkill.years}</div>
                  <div className="text-gray-600 dark:text-gray-400">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center">
                  <Eye className="w-8 h-8 mx-auto mb-3 text-green-500" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{selectedSkill.projects}</div>
                  <div className="text-gray-600 dark:text-gray-400">Projects</div>
                </div>
              </div>

              {selectedSkill.tags && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies & Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
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
