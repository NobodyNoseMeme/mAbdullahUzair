import { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Power, 
  Settings, 
  Terminal, 
  Code, 
  Database, 
  Globe, 
  Palette, 
  Layers, 
  Zap, 
  Wrench, 
  Brain, 
  Target,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MousePointer,
  Keyboard,
  ChevronDown,
  ChevronRight,
  Star,
  Trophy,
  Award,
  TrendingUp,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardLayout, setKeyboardLayout] = useState('qwerty');
  const [rotationX, setRotationX] = useState(-10);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [typedSequence, setTypedSequence] = useState('');
  const [isTypingMode, setIsTypingMode] = useState(true);
  const [keyboardTheme, setKeyboardTheme] = useState('mechanical');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [menuViewMode, setMenuViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedMenuSkill, setSelectedMenuSkill] = useState(null);
  const sectionRef = useRef(null);
  const keyboardRef = useRef(null);

  // Categorized skills data
  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      icon: Palette,
      description: 'Creating beautiful and responsive user interfaces',
      skills: [
        { name: 'HTML5', level: 95, years: 1, projects: 5, icon: Code, color: '#E34F26', description: 'Semantic markup and modern web standards' },
        { name: 'CSS3', level: 92, years: 1, projects: 5, icon: Palette, color: '#1572B6', description: 'Advanced styling and responsive design' },
        { name: 'JavaScript', level: 85, years: 1, projects: 5, icon: Zap, color: '#F7DF1E', description: 'Modern ES6+ and DOM manipulation' },
        { name: 'React.js', level: 82, years: 1, projects: 5, icon: Layers, color: '#61DAFB', description: 'Component-based architecture' },
        { name: 'Tailwind CSS', level: 90, years: 1, projects: 5, icon: Wrench, color: '#06B6D4', description: 'Utility-first CSS framework' },
        { name: 'Bootstrap', level: 88, years: 1, projects: 5, icon: Grid3X3, color: '#7952B3', description: 'Responsive component library' }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      icon: Database,
      description: 'Building robust server-side applications',
      skills: [
        { name: 'PHP', level: 80, years: 1, projects: 5, icon: Code, color: '#777BB4', description: 'Server-side scripting' },
        { name: 'Node.js', level: 75, years: 1, projects: 5, icon: Cpu, color: '#339933', description: 'JavaScript runtime environment' },
        { name: 'Express.js', level: 75, years: 1, projects: 5, icon: Globe, color: '#000000', description: 'Web framework for Node.js' },
        { name: 'RESTful APIs', level: 72, years: 1, projects: 5, icon: Wifi, color: '#FF4500', description: 'API design and development' }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      icon: HardDrive,
      description: 'Data management and development tools',
      skills: [
        { name: 'MySQL', level: 78, years: 1, projects: 5, icon: Database, color: '#4479A1', description: 'Relational database management' },
        { name: 'MongoDB', level: 70, years: 1, projects: 5, icon: Layers, color: '#47A248', description: 'NoSQL document database' },
        { name: 'Git & GitHub', level: 88, years: 1, projects: 5, icon: Code, color: '#F05032', description: 'Version control system' },
        { name: 'VS Code', level: 95, years: 1, projects: 5, icon: Monitor, color: '#007ACC', description: 'Advanced IDE usage' },
        { name: 'Postman', level: 80, years: 1, projects: 5, icon: Target, color: '#FF6C37', description: 'API testing and documentation' }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      icon: Brain,
      description: 'Core programming languages and paradigms',
      skills: [
        { name: 'C', level: 85, years: 1, projects: 5, icon: Cpu, color: '#A8B9CC', description: 'System programming language' },
        { name: 'C++', level: 82, years: 1, projects: 5, icon: Layers, color: '#00599C', description: 'Object-oriented programming' },
        { name: 'Python', level: 75, years: 1, projects: 5, icon: Brain, color: '#3776AB', description: 'Versatile programming language' },
        { name: 'Machine Learning', level: 65, years: 1, projects: 5, icon: Star, color: '#FF6B6B', description: 'AI and data science' }
      ]
    }
  };

  // Create mapping for first letters to skills
  const createKeyMapping = () => {
    const mapping = {};
    Object.values(skillsData).forEach(category => {
      category.skills.forEach(skill => {
        const firstLetter = skill.name.charAt(0).toUpperCase();
        if (!mapping[firstLetter]) {
          mapping[firstLetter] = [];
        }
        mapping[firstLetter].push({
          ...skill,
          category: category.name,
          categoryColor: category.color
        });
      });
    });
    return mapping;
  };

  const keyMapping = createKeyMapping();

  // Keyboard layout with proper key positions
  const skillKeyboard = {
    qwerty: {
      name: 'QWERTY Layout',
      theme: '#3B82F6',
      rows: [
        [
          { key: '`', label: '~', type: 'function' },
          { key: '1', label: '1', type: 'normal' },
          { key: '2', label: '2', type: 'normal' },
          { key: '3', label: '3', type: 'normal' },
          { key: '4', label: '4', type: 'normal' },
          { key: '5', label: '5', type: 'normal' },
          { key: '6', label: '6', type: 'normal' },
          { key: '7', label: '7', type: 'normal' },
          { key: '8', label: '8', type: 'normal' },
          { key: '9', label: '9', type: 'normal' },
          { key: '0', label: '0', type: 'normal' },
          { key: '-', label: '_', type: 'function' },
          { key: '=', label: '+', type: 'function' },
          { key: 'Backspace', label: '⌫', type: 'function', width: 'w-24' }
        ],
        [
          { key: 'Tab', label: '⇥', type: 'function', width: 'w-16' },
          { key: 'Q', label: 'Q', type: 'skill' },
          { key: 'W', label: 'W', type: 'skill' },
          { key: 'E', label: 'E', type: 'skill' },
          { key: 'R', label: 'R', type: 'skill' },
          { key: 'T', label: 'T', type: 'skill' },
          { key: 'Y', label: 'Y', type: 'skill' },
          { key: 'U', label: 'U', type: 'skill' },
          { key: 'I', label: 'I', type: 'skill' },
          { key: 'O', label: 'O', type: 'skill' },
          { key: 'P', label: 'P', type: 'skill' },
          { key: '[', label: '{', type: 'function' },
          { key: ']', label: '}', type: 'function' },
          { key: '\\', label: '|', type: 'function' }
        ],
        [
          { key: 'CapsLock', label: '⇪', type: 'function', width: 'w-20' },
          { key: 'A', label: 'A', type: 'skill' },
          { key: 'S', label: 'S', type: 'skill' },
          { key: 'D', label: 'D', type: 'skill' },
          { key: 'F', label: 'F', type: 'skill' },
          { key: 'G', label: 'G', type: 'skill' },
          { key: 'H', label: 'H', type: 'skill' },
          { key: 'J', label: 'J', type: 'skill' },
          { key: 'K', label: 'K', type: 'skill' },
          { key: 'L', label: 'L', type: 'skill' },
          { key: ';', label: ':', type: 'function' },
          { key: "'", label: '"', type: 'function' },
          { key: 'Enter', label: '⏎', type: 'function', width: 'w-24' }
        ],
        [
          { key: 'Shift', label: '⇧', type: 'function', width: 'w-28' },
          { key: 'Z', label: 'Z', type: 'skill' },
          { key: 'X', label: 'X', type: 'skill' },
          { key: 'C', label: 'C', type: 'skill' },
          { key: 'V', label: 'V', type: 'skill' },
          { key: 'B', label: 'B', type: 'skill' },
          { key: 'N', label: 'N', type: 'skill' },
          { key: 'M', label: 'M', type: 'skill' },
          { key: ',', label: '<', type: 'function' },
          { key: '.', label: '>', type: 'function' },
          { key: '/', label: '?', type: 'function' },
          { key: 'Shift', label: '⇧', type: 'function', width: 'w-28' }
        ],
        [
          { key: 'Ctrl', label: 'Ctrl', type: 'function', width: 'w-16' },
          { key: 'Fn', label: 'Fn', type: 'function', width: 'w-14' },
          { key: 'Alt', label: 'Alt', type: 'function', width: 'w-16' },
          { key: 'Space', label: 'Space', type: 'function', width: 'w-64' },
          { key: 'Alt', label: 'Alt', type: 'function', width: 'w-16' },
          { key: 'Fn', label: 'Fn', type: 'function', width: 'w-14' },
          { key: 'Menu', label: '☰', type: 'function', width: 'w-14' },
          { key: 'Ctrl', label: 'Ctrl', type: 'function', width: 'w-16' }
        ]
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

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotationY(prev => (prev + 1) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Mouse tracking for 3D rotation
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (keyboardRef.current) {
        const rect = keyboardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = ((e.clientX - centerX) / rect.width) * 30;
        const mouseY = ((e.clientY - centerY) / rect.height) * 20;
        
        if (!autoRotate) {
          setMousePosition({ x: mouseX, y: mouseY });
          setRotationY(mouseX);
          setRotationX(-10 + mouseY);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [autoRotate]);

  // Keyboard input handling for first letter mapping
  useEffect(() => {
    if (!isTypingMode) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => new Set(prev).add(key));
      
      // Find skills that start with this letter
      const skills = keyMapping[key];
      if (skills && skills.length > 0) {
        setSelectedKey({ key, skills });
        setTypedSequence(prev => prev + key);
        
        // Play sound effect
        if (soundEnabled) {
          const audio = new AudioContext();
          const oscillator = audio.createOscillator();
          const gainNode = audio.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audio.destination);
          
          oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audio.currentTime);
          oscillator.type = 'square';
          
          gainNode.gain.setValueAtTime(0.1, audio.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
          
          oscillator.start(audio.currentTime);
          oscillator.stop(audio.currentTime + 0.1);
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTypingMode, soundEnabled, keyMapping]);

  const resetRotation = () => {
    setRotationX(-10);
    setRotationY(0);
    setRotationZ(0);
  };

  const getKeyStyle = (keyData) => {
    const isPressed = pressedKeys.has(keyData.key.toUpperCase());
    const isSelected = selectedKey?.key === keyData.key;
    const hasSkills = keyData.type === 'skill' && keyMapping[keyData.key];
    
    let baseClasses = `
      h-12 rounded-lg font-mono font-bold text-sm transition-all duration-150 transform
      ${keyData.width || 'w-12'} 
      ${isPressed ? 'scale-95 shadow-inner' : 'shadow-lg hover:shadow-xl'} 
      ${isSelected ? 'ring-2 ring-blue-400 ring-opacity-75' : ''}
      ${hasSkills ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
    `;

    if (keyData.type === 'function') {
      return `${baseClasses} bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-gray-600`;
    } else if (hasSkills) {
      return `${baseClasses} bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-2 border-blue-500`;
    } else {
      return `${baseClasses} bg-gray-800 hover:bg-gray-700 text-gray-300 border-2 border-gray-600`;
    }
  };

  const getKeyContent = (keyData) => {
    if (keyData.type === 'skill' && keyMapping[keyData.key]) {
      const skills = keyMapping[keyData.key];
      return (
        <div className="flex flex-col items-center justify-center h-full relative">
          <span className="text-lg font-bold">{keyData.key}</span>
          <div className="text-xs text-gray-200">{skills.length} skill{skills.length > 1 ? 's' : ''}</div>
          {/* Indicator dots */}
          <div className="absolute bottom-1 flex space-x-1">
            {skills.slice(0, 3).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full opacity-60" />
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center h-full">
        <span>{keyData.label || keyData.key}</span>
      </div>
    );
  };

  const currentLayout = skillKeyboard[keyboardLayout];

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden min-h-screen"
    >
      {/* Computer Environment Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Code Snippets */}
        <div className="absolute top-1/4 left-1/4 text-green-400 font-mono text-xs opacity-20 animate-pulse">
          {'console.log("Hello World");'}
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-blue-400 font-mono text-xs opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
          {'function() { return true; }'}
        </div>
        <div className="absolute top-1/2 right-1/3 text-purple-400 font-mono text-xs opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>
          {'<div className="awesome">'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center mb-6">
            <Terminal className="w-12 h-12 text-green-400 mr-4 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold font-mono">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interactive Keyboard .. Write skills here.
              </span>
            </h2>
            <Keyboard className="w-12 h-12 text-blue-400 ml-4 animate-bounce" />
          </div>
          
          {/* System Status */}
          <div className="flex items-center justify-center space-x-4 text-sm font-mono">
            <div className="flex items-center space-x-2">
              <Power className={`w-4 h-4 ${isTypingMode ? 'text-green-400' : 'text-red-400'}`} />
              <span className="text-gray-400">SYSTEM: {isTypingMode ? 'ONLINE' : 'OFFLINE'}</span>
            </div>
            <div className="text-gray-600">|</div>
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">LAYOUT: {currentLayout.name.toUpperCase()}</span>
            </div>
            <div className="text-gray-600">|</div>
            <div className="flex items-center space-x-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
              <span className="text-gray-400">AUDIO: {soundEnabled ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Rotation Controls */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600">
            <MousePointer className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 text-sm">3D:</span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1 rounded text-sm ${autoRotate ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {autoRotate ? <Play size={14} /> : <Pause size={14} />}
            </button>
            <button
              onClick={resetRotation}
              className="p-1 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              <RotateCcw size={16} className="text-gray-300" />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center space-x-2"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-purple-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
              <span className="text-gray-300 text-sm">{soundEnabled ? 'Sound On' : 'Sound Off'}</span>
            </button>
          </div>

          {/* Typing Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600">
            <Keyboard className="w-5 h-5 text-green-400" />
            <button
              onClick={() => setIsTypingMode(!isTypingMode)}
              className={`px-3 py-1 rounded text-sm ${isTypingMode ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              {isTypingMode ? 'Typing Enabled' : 'Click Only'}
            </button>
          </div>
        </div>

        {/* Typed Sequence Display */}
        {typedSequence && (
          <div className="text-center mb-8">
            <div className="inline-block bg-black/50 backdrop-blur-md rounded-lg px-6 py-3 border border-green-400/30">
              <div className="text-green-400 font-mono text-sm mb-1">TYPED SEQUENCE:</div>
              <div className="text-white font-mono text-lg">
                {typedSequence}
                <span className="animate-pulse">|</span>
              </div>
              <button
                onClick={() => setTypedSequence('')}
                className="text-gray-400 hover:text-white text-xs mt-2"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* 3D Keyboard */}
        <div className={`flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div 
            ref={keyboardRef}
            className="relative perspective-1000"
            style={{ perspective: '1200px' }}
          >
            <div 
              className="transform-3d transition-transform duration-300 ease-out"
              style={{
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Keyboard Base */}
              <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
                {/* Keyboard Brand */}
                <div className="text-center mb-4">
                  <div className="text-gray-400 font-mono text-xs">SKILLS KEYBOARD v2.0</div>
                  <div 
                    className="text-sm font-bold"
                    style={{ color: currentLayout.theme }}
                  >
                    {currentLayout.name}
                  </div>
                </div>

                {/* Keyboard Rows */}
                <div className="space-y-2">
                  {currentLayout.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center space-x-1">
                      {row.map((keyData, keyIndex) => (
                        <button
                          key={`${rowIndex}-${keyIndex}`}
                          className={getKeyStyle(keyData)}
                          onClick={() => {
                            if (keyData.type === 'skill' && keyMapping[keyData.key]) {
                              setSelectedKey({ key: keyData.key, skills: keyMapping[keyData.key] });
                              setTypedSequence(prev => prev + keyData.key);
                            }
                          }}
                        >
                          {getKeyContent(keyData)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Keyboard Status LEDs */}
                <div className="flex justify-end space-x-2 mt-4">
                  <div className={`w-2 h-2 rounded-full ${isTypingMode ? 'bg-green-400' : 'bg-gray-600'}`} />
                  <div className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-blue-400' : 'bg-gray-600'}`} />
                  <div className={`w-2 h-2 rounded-full ${autoRotate ? 'bg-purple-400' : 'bg-gray-600'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Key Skills Display */}
        {selectedKey && selectedKey.skills && (
          <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-2xl font-bold">{selectedKey.key}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white font-mono">
                      Skills starting with "{selectedKey.key}"
                    </h3>
                    <p className="text-gray-300">{selectedKey.skills.length} skill{selectedKey.skills.length > 1 ? 's' : ''} found</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedKey.skills.map((skill, index) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div key={index} className="bg-white/5 rounded-2xl p-4 border border-gray-700/50">
                      <div className="flex items-center mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${skill.color}20` }}
                        >
                          <SkillIcon size={20} style={{ color: skill.color }} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{skill.name}</h4>
                          <p className="text-gray-400 text-xs">{skill.category}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{skill.level}% proficiency</span>
                        <span>{skill.projects} projects</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Menu-Based Skills Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Skills Overview
              </span>
            </h3>
            <p className="text-gray-400 text-lg">Explore my technical expertise by category</p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600">
              <button
                onClick={() => setMenuViewMode('grid')}
                className={`px-3 py-1 rounded text-sm flex items-center space-x-2 ${
                  menuViewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <Grid3X3 size={16} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setMenuViewMode('list')}
                className={`px-3 py-1 rounded text-sm flex items-center space-x-2 ${
                  menuViewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                <List size={16} />
                <span>List</span>
              </button>
            </div>
          </div>

          {/* Skills Categories */}
          {menuViewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(skillsData).map(([key, category]) => {
                const IconComponent = category.icon;
                const avgLevel = Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length);
                
                return (
                  <div
                    key={key}
                    className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                    onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                  >
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <IconComponent size={24} style={{ color: category.color }} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{category.name}</h4>
                        <p className="text-gray-400 text-sm">{category.skills.length} skills</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-sm">Average Level:</span>
                      <span className="font-bold" style={{ color: category.color }}>{avgLevel}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${avgLevel}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>

                    {expandedCategory === key && (
                      <div className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                        {category.skills.map((skill, index) => {
                          const SkillIcon = skill.icon;
                          return (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMenuSkill(skill);
                              }}
                            >
                              <div className="flex items-center">
                                <SkillIcon size={16} style={{ color: skill.color }} className="mr-2" />
                                <span className="text-white text-sm">{skill.name}</span>
                              </div>
                              <span className="text-gray-400 text-xs">{skill.level}%</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center mt-4">
                      <ChevronDown 
                        size={20} 
                        className={`text-gray-400 transition-transform duration-300 ${
                          expandedCategory === key ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(skillsData).map(([key, category]) => {
                const IconComponent = category.icon;
                const isExpanded = expandedCategory === key;
                
                return (
                  <div key={key} className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden">
                    <div 
                      className="p-6 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                      onClick={() => setExpandedCategory(isExpanded ? null : key)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                            style={{ backgroundColor: `${category.color}20` }}
                          >
                            <IconComponent size={24} style={{ color: category.color }} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">{category.name}</h4>
                            <p className="text-gray-400">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-white font-bold">{category.skills.length}</div>
                            <div className="text-gray-400 text-sm">skills</div>
                          </div>
                          <ChevronRight 
                            size={20} 
                            className={`text-gray-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-90' : ''
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.skills.map((skill, index) => {
                            const SkillIcon = skill.icon;
                            return (
                              <div 
                                key={index}
                                className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer border border-gray-600"
                                onClick={() => setSelectedMenuSkill(skill)}
                              >
                                <div className="flex items-center mb-3">
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                                    style={{ backgroundColor: `${skill.color}20` }}
                                  >
                                    <SkillIcon size={16} style={{ color: skill.color }} />
                                  </div>
                                  <div>
                                    <h5 className="text-white font-semibold">{skill.name}</h5>
                                    <p className="text-gray-400 text-xs">{skill.level}% proficiency</p>
                                  </div>
                                </div>
                                <p className="text-gray-300 text-sm">{skill.description}</p>
                                <div className="flex justify-between mt-3 text-xs text-gray-400">
                                  <span>{skill.years} year{skill.years !== 1 ? 's' : ''}</span>
                                  <span>{skill.projects} projects</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Menu Skill Modal */}
        {selectedMenuSkill && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-3xl p-8 max-w-2xl w-full border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${selectedMenuSkill.color}20` }}
                  >
                    <selectedMenuSkill.icon size={32} style={{ color: selectedMenuSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedMenuSkill.name}</h3>
                    <p className="text-gray-400">{selectedMenuSkill.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMenuSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedMenuSkill.level}%</div>
                  <div className="text-gray-400 text-sm">Proficiency</div>
                </div>
                
                <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                  <Award className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedMenuSkill.years}</div>
                  <div className="text-gray-400 text-sm">Year{selectedMenuSkill.years !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="bg-gray-700/50 rounded-2xl p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedMenuSkill.projects}</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-12">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
            <h4 className="text-lg font-bold text-white mb-4 font-mono">INSTRUCTIONS</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300 font-mono">
              <div>
                <kbd className="bg-gray-800 px-2 py-1 rounded">H</kbd> - HTML5 Skills
              </div>
              <div>
                <kbd className="bg-gray-800 px-2 py-1 rounded">C</kbd> - CSS3 & C/C++
              </div>
              <div>
                <kbd className="bg-gray-800 px-2 py-1 rounded">J</kbd> - JavaScript  
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Press the first letter of any skill to explore • Move mouse to rotate keyboard in 3D space
            </p>
          </div>
        </div>
      </div>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-3d {
          transform-style: preserve-3d;
        }
        kbd {
          font-family: monospace;
        }
      `}</style>
    </section>
  );
};

export default Skills;
