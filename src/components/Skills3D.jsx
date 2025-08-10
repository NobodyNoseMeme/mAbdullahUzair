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
  MousePointer
} from 'lucide-react';

const Skills3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0, rotateX: -10, rotateY: 5 });
  const [isDraggingKeyboard, setIsDraggingKeyboard] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [clickedKey, setClickedKey] = useState(null);
  const sectionRef = useRef(null);
  const keyboardRef = useRef(null);

  // Grouped skills data
  const skillGroups = {
    mernStack: {
      title: 'MERN Stack',
      icon: Layers,
      color: 'from-green-500 to-emerald-600',
      description: 'Full-stack JavaScript development',
      keyLetter: 'M',
      skills: [
        { name: 'MongoDB', level: 75, projects: 8, key: 'M' },
        { name: 'Express.js', level: 80, projects: 10, key: 'E' },
        { name: 'React.js', level: 90, projects: 15, key: 'R' },
        { name: 'Node.js', level: 85, projects: 12, key: 'N' }
      ]
    },
    frontend: {
      title: 'Frontend Technologies',
      icon: Palette,
      color: 'from-blue-500 to-cyan-600',
      description: 'Modern UI/UX development',
      keyLetter: 'F',
      skills: [
        { name: 'HTML5', level: 95, projects: 20, key: 'H' },
        { name: 'CSS3', level: 90, projects: 20, key: 'C' },
        { name: 'JavaScript', level: 88, projects: 18, key: 'J' },
        { name: 'Tailwind CSS', level: 92, projects: 15, key: 'T' },
        { name: 'Bootstrap', level: 85, projects: 12, key: 'B' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      description: 'Server-side technologies',
      keyLetter: 'S',
      skills: [
        { name: 'PHP', level: 82, projects: 14, key: 'P' },
        { name: 'MySQL', level: 80, projects: 16, key: 'Q' },
        { name: 'Python', level: 75, projects: 10, key: 'Y' }
      ]
    },
    tools: {
      title: 'Development Tools',
      icon: Wrench,
      color: 'from-orange-500 to-red-600',
      description: 'Essential dev tools',
      keyLetter: 'D',
      skills: [
        { name: 'Git & GitHub', level: 90, projects: 25, key: 'G' },
        { name: 'VS Code', level: 95, projects: 25, key: 'V' },
        { name: 'Terminal', level: 85, projects: 20, key: 'L' }
      ]
    },
    emerging: {
      title: 'Emerging Tech',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      description: 'AI & Machine Learning',
      keyLetter: 'A',
      skills: [
        { name: 'Machine Learning', level: 70, projects: 6, key: 'I' },
        { name: 'AI Development', level: 65, projects: 4, key: 'A' }
      ]
    }
  };

  // Create keyboard layout based on skills
  const createKeyboardLayout = () => {
    const qwertyRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    // Map skills to keys
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

  // 3D Keyboard drag functionality
  const handleKeyboardMouseDown = (e) => {
    if (!keyboardRef.current?.contains(e.target)) return;
    setIsDraggingKeyboard(true);
    setDragStart({
      x: e.clientX - keyboardPosition.x,
      y: e.clientY - keyboardPosition.y
    });
    e.preventDefault();
  };

  const handleKeyboardMouseMove = (e) => {
    if (!isDraggingKeyboard) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setKeyboardPosition(prev => ({
      x: deltaX,
      y: deltaY,
      rotateX: prev.rotateX + (deltaY - prev.y) * 0.1,
      rotateY: prev.rotateY + (deltaX - prev.x) * 0.1
    }));
  };

  const handleKeyboardMouseUp = () => {
    setIsDraggingKeyboard(false);
  };

  useEffect(() => {
    if (isDraggingKeyboard) {
      document.addEventListener('mousemove', handleKeyboardMouseMove);
      document.addEventListener('mouseup', handleKeyboardMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleKeyboardMouseMove);
      document.removeEventListener('mouseup', handleKeyboardMouseUp);
    };
  }, [isDraggingKeyboard, dragStart]);

  const handleGroupClick = (groupKey) => {
    setExpandedGroup(expandedGroup === groupKey ? null : groupKey);
  };

  const handleKeyClick = (keyData) => {
    if (!keyData.isActive) return;
    
    setClickedKey(keyData.key);
    setTimeout(() => setClickedKey(null), 200);
    
    if (keyData.skill?.type === 'group') {
      setExpandedGroup(expandedGroup === Object.keys(skillGroups).find(k => skillGroups[k] === keyData.skill.data) ? null : Object.keys(skillGroups).find(k => skillGroups[k] === keyData.skill.data));
    }
  };

  const SkillGroupCard = ({ groupKey, group, isExpanded }) => {
    const IconComponent = group.icon;
    
    return (
      <div className="relative">
        {/* Main Group Card */}
        <div
          className={`group relative w-full h-32 perspective-1000 cursor-pointer transition-all duration-500 ${
            isExpanded ? 'mb-6' : 'mb-4'
          }`}
          onClick={() => handleGroupClick(groupKey)}
          onMouseEnter={() => setHoveredCard(groupKey)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              hoveredCard === groupKey && !isExpanded ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${group.color} rounded-2xl shadow-2xl backface-hidden border-2 border-white/20`}>
              <div className="flex items-center justify-between p-6 h-full">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{group.title}</h3>
                    <p className="text-white/80 text-sm">{group.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold">{group.keyLetter}</span>
                  </div>
                  <ChevronDown className={`mt-2 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={20} />
                </div>
              </div>
            </div>
            
            {/* Back Face */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${group.color} rounded-2xl shadow-2xl backface-hidden rotate-y-180 border-2 border-white/20`}>
              <div className="p-6 h-full flex flex-col justify-center items-center text-center">
                <Sparkles className="text-white mb-3" size={32} />
                <h4 className="text-white font-bold mb-2">Skills Overview</h4>
                <p className="text-white/90 text-sm mb-3">{group.skills.length} Technologies</p>
                <div className="text-white/80 text-xs">
                  Click to explore individual skills
                </div>
              </div>
            </div>
          </div>
          
          {/* Click Effect */}
          <div className={`absolute inset-0 bg-white/20 rounded-2xl pointer-events-none transition-opacity duration-200 ${
            clickedKey === group.keyLetter ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Expanded Skills */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 transition-all duration-500 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {group.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative h-24 perspective-500 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
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
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg backface-hidden border border-gray-200 dark:border-gray-700">
                  <div className="p-3 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{skill.name}</span>
                      <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded text-xs font-bold flex items-center justify-center">
                        {skill.key}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 bg-gradient-to-r ${group.color} rounded-full transition-all duration-1000`}
                          style={{ width: isExpanded ? `${skill.level}%` : '0%' }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {skill.level}% proficiency
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg backface-hidden rotate-y-180 border border-gray-200 dark:border-gray-600">
                  <div className="p-3 h-full flex flex-col justify-center items-center text-center">
                    <Star className="text-yellow-400 mb-2" size={20} />
                    <div className="text-white text-xs font-bold mb-1">{skill.projects} Projects</div>
                    <div className="text-white/70 text-xs">2 years exp.</div>
                  </div>
                </div>
              </div>
              
              {/* Click Effect */}
              <div className={`absolute inset-0 bg-blue-400/30 rounded-xl pointer-events-none transition-opacity duration-200 ${
                clickedKey === skill.key ? 'opacity-100' : 'opacity-0'
              }`} />
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
        className={`relative w-10 h-10 m-0.5 rounded-lg cursor-pointer transition-all duration-200 transform ${
          isPressed ? 'scale-95 translate-y-1' : 'hover:scale-105'
        } ${
          isActive 
            ? skill?.type === 'group' 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
              : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
        onClick={() => handleKeyClick(keyData)}
      >
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative w-full h-full flex items-center justify-center">
          <span className={`text-xs font-bold ${isActive ? 'text-white' : ''}`}>
            {key}
          </span>
        </div>
        
        {/* Key press effect */}
        <div className={`absolute inset-0 bg-white/30 rounded-lg transition-opacity duration-100 ${
          isPressed ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Skill indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white" />
        )}
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interactive Skills Lab
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my technical expertise through an interactive 3D experience
          </p>
          
          {/* Instruction */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <MousePointer size={16} />
            <span>Drag the keyboard to rotate • Click keys to explore skills</span>
          </div>
        </div>

        {/* 3D Interactive Keyboard */}
        <div className={`flex justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div
            ref={keyboardRef}
            className={`relative select-none ${isDraggingKeyboard ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `translate(${keyboardPosition.x}px, ${keyboardPosition.y}px) perspective(1000px) rotateX(${keyboardPosition.rotateX}deg) rotateY(${keyboardPosition.rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
            onMouseDown={handleKeyboardMouseDown}
          >
            {/* Keyboard Base */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-600">
              <div className="space-y-2">
                {keyboardLayout.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center"
                    style={{
                      marginLeft: rowIndex === 1 ? '20px' : rowIndex === 2 ? '40px' : '0'
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
              
              {/* Keyboard brand */}
              <div className="text-center mt-4">
                <div className="text-xs text-gray-400 font-mono">SKILLBOARD v2.0</div>
              </div>
            </div>
            
            {/* 3D shadow */}
            <div 
              className="absolute inset-0 bg-black/20 rounded-2xl blur-xl transform translate-y-8 -z-10"
              style={{ transform: 'translateY(20px) translateZ(-20px)' }}
            />
          </div>
        </div>

        {/* Skills Groups */}
        <div className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {Object.entries(skillGroups).map(([groupKey, group], index) => (
            <div
              key={groupKey}
              style={{ animationDelay: `${index * 200}ms` }}
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

        {/* Legend */}
        <div className={`mt-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">How to Navigate</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Group keys (blue/purple)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">H</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">Individual skills (green)</span>
            </div>
            <div className="flex items-center space-x-3">
              <MousePointer className="text-blue-600" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Drag keyboard to rotate in 3D</span>
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
      `}</style>
    </section>
  );
};

export default Skills3D;
