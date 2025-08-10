import { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Cpu,
  HardDrive,
  Terminal,
  Code,
  Database,
  Globe,
  Palette,
  Layers,
  Zap,
  Wrench,
  Brain,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
  RotateCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lightbulb,
  Award,
  Target
} from 'lucide-react';

const Skills3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [keyboardRotation, setKeyboardRotation] = useState({ x: -15, y: 5, z: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [clickedKey, setClickedKey] = useState(null);
  const [typingMode, setTypingMode] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const sectionRef = useRef(null);
  const autoRotateRef = useRef(null);

  // Enhanced grouped skills data with more details
  const skillGroups = {
    mernStack: {
      title: 'MERN Stack',
      icon: Layers,
      color: 'from-green-500 to-emerald-600',
      description: 'Full-stack JavaScript development',
      keyLetter: 'M',
      level: 85,
      projects: 12,
      skills: [
        { name: 'MongoDB', level: 75, projects: 8, key: 'M', description: 'NoSQL database' },
        { name: 'Express.js', level: 80, projects: 10, key: 'E', description: 'Backend framework' },
        { name: 'React.js', level: 90, projects: 15, key: 'R', description: 'Frontend library' },
        { name: 'Node.js', level: 85, projects: 12, key: 'N', description: 'Runtime environment' }
      ]
    },
    frontend: {
      title: 'Frontend',
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      description: 'Modern UI/UX development',
      keyLetter: 'F',
      level: 92,
      projects: 20,
      skills: [
        { name: 'HTML5', level: 95, projects: 20, key: 'H', description: 'Markup language' },
        { name: 'CSS3', level: 90, projects: 20, key: 'C', description: 'Styling language' },
        { name: 'JavaScript', level: 88, projects: 18, key: 'J', description: 'Programming language' },
        { name: 'Tailwind', level: 92, projects: 15, key: 'T', description: 'Utility-first CSS' },
        { name: 'Bootstrap', level: 85, projects: 12, key: 'B', description: 'CSS framework' }
      ]
    },
    backend: {
      title: 'Backend',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      description: 'Server-side technologies',
      keyLetter: 'S',
      level: 78,
      projects: 14,
      skills: [
        { name: 'PHP', level: 82, projects: 14, key: 'P', description: 'Server-side scripting' },
        { name: 'MySQL', level: 80, projects: 16, key: 'Q', description: 'Relational database' },
        { name: 'Python', level: 75, projects: 10, key: 'Y', description: 'Programming language' }
      ]
    },
    tools: {
      title: 'DevTools',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      description: 'Development tools & workflow',
      keyLetter: 'D',
      level: 90,
      projects: 25,
      skills: [
        { name: 'Git', level: 90, projects: 25, key: 'G', description: 'Version control' },
        { name: 'VS Code', level: 95, projects: 25, key: 'V', description: 'Code editor' },
        { name: 'Terminal', level: 85, projects: 20, key: 'L', description: 'Command line' }
      ]
    },
    ai: {
      title: 'AI/ML',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      description: 'Artificial Intelligence & ML',
      keyLetter: 'A',
      level: 68,
      projects: 6,
      skills: [
        { name: 'ML', level: 70, projects: 6, key: 'I', description: 'Machine Learning' },
        { name: 'AI Dev', level: 65, projects: 4, key: 'A', description: 'AI Development' }
      ]
    }
  };

  // Create enhanced keyboard layout
  const createKeyboardLayout = () => {
    const qwertyRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    const skillKeyMap = {};
    Object.values(skillGroups).forEach(group => {
      skillKeyMap[group.keyLetter] = { type: 'group', data: group };
      group.skills.forEach(skill => {
        skillKeyMap[skill.key] = { type: 'skill', data: skill };
      });
    });

    return qwertyRows.map(row => 
      row.map(key => ({
        key,
        skill: skillKeyMap[key],
        isActive: !!skillKeyMap[key]
      }))
    );
  };

  const keyboardLayout = createKeyboardLayout();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-20px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Auto rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateRef.current = setInterval(() => {
        setKeyboardRotation(prev => ({
          ...prev,
          y: prev.y + 2
        }));
      }, 50);
    } else {
      clearInterval(autoRotateRef.current);
    }

    return () => clearInterval(autoRotateRef.current);
  }, [isAutoRotating]);

  // Keyboard rotation controls
  const rotateKeyboard = (axis, direction) => {
    const step = 15;
    setKeyboardRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + (direction * step)
    }));
    
    if (soundEnabled) {
      playKeySound();
    }
  };

  const resetRotation = () => {
    setKeyboardRotation({ x: -15, y: 5, z: 0 });
  };

  const playKeySound = () => {
    if (soundEnabled) {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const handleKeyClick = (keyData) => {
    if (!keyData.isActive) return;
    
    setClickedKey(keyData.key);
    setTimeout(() => setClickedKey(null), 150);
    
    if (typingMode) {
      setTypedText(prev => prev + keyData.key);
    }
    
    if (keyData.skill?.type === 'group') {
      const groupKey = Object.keys(skillGroups).find(k => skillGroups[k] === keyData.skill.data);
      setExpandedGroup(expandedGroup === groupKey ? null : groupKey);
    } else if (keyData.skill?.type === 'skill') {
      setSelectedSkill(keyData.skill.data);
      setTimeout(() => setSelectedSkill(null), 3000);
    }
    
    playKeySound();
  };

  const SkillGroupCard = ({ groupKey, group, isExpanded }) => {
    const IconComponent = group.icon;
    
    return (
      <div className="relative">
        {/* Compact Group Card */}
        <div
          className={`group relative w-full h-20 perspective-1000 cursor-pointer transition-all duration-500 ${
            isExpanded ? 'mb-4' : 'mb-3'
          }`}
          onClick={() => setExpandedGroup(expandedGroup === groupKey ? null : groupKey)}
          onMouseEnter={() => setHoveredCard(groupKey)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              hoveredCard === groupKey && !isExpanded ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${group.color} rounded-xl shadow-lg backface-hidden border border-white/20`}>
              <div className="flex items-center justify-between p-4 h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <IconComponent size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{group.title}</h3>
                    <p className="text-white/80 text-xs">{group.skills.length} skills</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-white text-xs font-bold">{group.level}%</div>
                    <div className="w-6 h-6 bg-white/20 rounded text-xs font-bold flex items-center justify-center">
                      {group.keyLetter}
                    </div>
                  </div>
                  <ChevronDown className={`text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={16} />
                </div>
              </div>
            </div>
            
            {/* Back Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${group.color} rounded-xl shadow-lg backface-hidden rotate-y-180 border border-white/20`}>
              <div className="p-4 h-full flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="text-white" size={20} />
                  <div>
                    <div className="text-white font-bold text-sm">{group.projects} Projects</div>
                    <div className="text-white/80 text-xs">2 years experience</div>
                  </div>
                </div>
                <Target className="text-white/60" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Compact Expanded Skills */}
        <div className={`grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-32 opacity-100 mb-4' : 'max-h-0 opacity-0'
        }`}>
          {group.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative h-16 perspective-500 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredCard(`${groupKey}-${skill.name}`)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleKeyClick({ key: skill.key, isActive: true, skill: { type: 'skill', data: skill } })}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  hoveredCard === `${groupKey}-${skill.name}` ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md backface-hidden border border-gray-200 dark:border-gray-700">
                  <div className="p-2 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{skill.name}</span>
                      <span className="w-4 h-4 bg-gray-100 dark:bg-gray-700 rounded text-xs font-bold flex items-center justify-center">
                        {skill.key}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div
                          className={`h-1 bg-gradient-to-r ${group.color} rounded-full transition-all duration-1000`}
                          style={{ width: isExpanded ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        {skill.level}%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md backface-hidden rotate-y-180 border border-gray-600">
                  <div className="p-2 h-full flex flex-col justify-center items-center text-center">
                    <Star className="text-yellow-400 mb-1" size={14} />
                    <div className="text-white text-xs font-bold">{skill.projects}</div>
                    <div className="text-white/70 text-xs">projects</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const KeyboardKey = ({ keyData, isPressed }) => {
    const { key, skill, isActive } = keyData;
    
    return (
      <div
        className={`relative w-8 h-8 md:w-10 md:h-10 m-0.5 rounded-lg cursor-pointer transition-all duration-200 transform ${
          isPressed ? 'scale-95 translate-y-1 shadow-inner' : 'hover:scale-105 shadow-lg'
        } ${
          isActive 
            ? skill?.type === 'group' 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-blue-400/50' 
              : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-400/50'
            : 'bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200'
        } border-2 ${
          isActive ? 'border-white/30' : 'border-gray-400/30'
        }`}
        onClick={() => handleKeyClick(keyData)}
        style={{
          boxShadow: isPressed 
            ? 'inset 0 2px 4px rgba(0,0,0,0.3)' 
            : '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-white/10" />
        <div className="relative w-full h-full flex items-center justify-center">
          <span className={`text-xs md:text-sm font-bold ${isActive ? 'text-white' : ''}`}>
            {key}
          </span>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-white ${
            skill?.type === 'group' ? 'bg-yellow-400' : 'bg-orange-400'
          }`} />
        )}
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 relative overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interactive Skills Lab
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Explore my technical expertise through an interactive 3D keyboard experience
          </p>
        </div>

        {/* Keyboard Controls */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              {/* Rotation Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rotate:</span>
                <button
                  onClick={() => rotateKeyboard('x', -1)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Rotate Up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => rotateKeyboard('x', 1)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Rotate Down"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  onClick={() => rotateKeyboard('y', -1)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title="Rotate Left"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={() => rotateKeyboard('y', 1)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  title="Rotate Right"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-600 pl-4">
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`p-2 rounded-lg transition-colors ${
                    isAutoRotating ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  title="Auto Rotate"
                >
                  {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
                </button>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    soundEnabled ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  title="Toggle Sound"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  onClick={resetRotation}
                  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  title="Reset"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Typing Mode */}
              <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-600 pl-4">
                <button
                  onClick={() => setTypingMode(!typingMode)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    typingMode 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Type Mode
                </button>
                {typingMode && (
                  <button
                    onClick={() => setTypedText('')}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Typed Text Display */}
            {typingMode && (
              <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Typed Text:</div>
                <div className="font-mono text-gray-900 dark:text-white">
                  {typedText || 'Start typing with keyboard keys...'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3D Rotatable Keyboard */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div
            className="relative select-none"
            style={{
              transform: `perspective(1200px) rotateX(${keyboardRotation.x}deg) rotateY(${keyboardRotation.y}deg) rotateZ(${keyboardRotation.z}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Keyboard Base */}
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-4 md:p-6 shadow-2xl border border-gray-600 relative">
              <div className="space-y-1 md:space-y-2">
                {keyboardLayout.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center"
                    style={{
                      marginLeft: rowIndex === 1 ? '15px' : rowIndex === 2 ? '30px' : '0'
                    }}
                  >
                    {row.map((keyData) => (
                      <KeyboardKey
                        key={keyData.key}
                        keyData={keyData}
                        isPressed={clickedKey === keyData.key}
                      />
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Keyboard branding */}
              <div className="text-center mt-3">
                <div className="text-xs text-gray-400 font-mono">SKILLBOARD PRO v3.0</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-1" />
              </div>
            </div>
            
            {/* 3D depth effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 rounded-2xl -z-10"
              style={{ 
                transform: 'translateZ(-10px)',
                transformStyle: 'preserve-3d'
              }}
            />
          </div>
        </div>

        {/* Selected Skill Display */}
        {selectedSkill && (
          <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-bounce">
            <div className="flex items-center space-x-3">
              <Lightbulb className="text-yellow-500" size={20} />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{selectedSkill.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{selectedSkill.description}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Level: {selectedSkill.level}%</div>
              </div>
            </div>
          </div>
        )}

        {/* Compact Skills Groups */}
        <div className={`space-y-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {Object.entries(skillGroups).map(([groupKey, group], index) => (
            <div
              key={groupKey}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <SkillGroupCard
                groupKey={groupKey}
                group={group}
                isExpanded={expandedGroup === groupKey}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Legend */}
        <div className={`mt-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">Interactive Controls Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Group keys (blue)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">H</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Skills (green)</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCw className="text-blue-600" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Use controls to rotate</span>
            </div>
            <div className="flex items-center space-x-3">
              <Volume2 className="text-orange-600" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Sound effects enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .perspective-500 {
          perspective: 500px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-10px,0);
          }
          70% {
            transform: translate3d(0,-5px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Skills3D;
