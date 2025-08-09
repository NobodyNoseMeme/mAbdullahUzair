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
  Keyboard
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
  const sectionRef = useRef(null);
  const keyboardRef = useRef(null);

  // Skills mapped to keyboard keys
  const skillKeyboard = {
    qwerty: {
      name: 'Full Stack QWERTY',
      theme: '#3B82F6',
      rows: [
        [
          { key: '`', skill: null, label: '~', type: 'function' },
          { key: '1', skill: 'HTML5', level: 95, years: 1, projects: 5, color: '#E34F26', icon: Code },
          { key: '2', skill: 'CSS3', level: 92, years: 1, projects: 5, color: '#1572B6', icon: Palette },
          { key: '3', skill: 'JavaScript', level: 85, years: 1, projects: 5, color: '#F7DF1E', icon: Zap },
          { key: '4', skill: 'React.js', level: 82, years: 1, projects: 5, color: '#61DAFB', icon: Layers },
          { key: '5', skill: 'Node.js', level: 75, years: 1, projects: 5, color: '#339933', icon: Cpu },
          { key: '6', skill: 'PHP', level: 80, years: 1, projects: 5, color: '#777BB4', icon: Code },
          { key: '7', skill: 'Python', level: 75, years: 1, projects: 5, color: '#3776AB', icon: Brain },
          { key: '8', skill: 'MySQL', level: 78, years: 1, projects: 5, color: '#4479A1', icon: Database },
          { key: '9', skill: 'MongoDB', level: 70, years: 1, projects: 5, color: '#47A248', icon: Database },
          { key: '0', skill: 'Git', level: 88, years: 1, projects: 5, color: '#F05032', icon: Code },
          { key: '-', skill: null, label: '_', type: 'function' },
          { key: '=', skill: null, label: '+', type: 'function' },
          { key: 'Backspace', skill: null, label: '⌫', type: 'function', width: 'w-24' }
        ],
        [
          { key: 'Tab', skill: null, label: '⇥', type: 'function', width: 'w-16' },
          { key: 'Q', skill: 'Express.js', level: 75, years: 1, projects: 5, color: '#000000', icon: Globe },
          { key: 'W', skill: 'RESTful APIs', level: 72, years: 1, projects: 5, color: '#FF4500', icon: Wifi },
          { key: 'E', skill: 'Bootstrap', level: 88, years: 1, projects: 5, color: '#7952B3', icon: Wrench },
          { key: 'R', skill: 'Tailwind CSS', level: 90, years: 1, projects: 5, color: '#06B6D4', icon: Palette },
          { key: 'T', skill: 'VS Code', level: 95, years: 1, projects: 5, color: '#007ACC', icon: Monitor },
          { key: 'Y', skill: 'Postman', level: 80, years: 1, projects: 5, color: '#FF6C37', icon: Target },
          { key: 'U', skill: 'C', level: 85, years: 1, projects: 5, color: '#A8B9CC', icon: Cpu },
          { key: 'I', skill: 'C++', level: 82, years: 1, projects: 5, color: '#00599C', icon: Layers },
          { key: 'O', skill: 'Machine Learning', level: 65, years: 1, projects: 5, color: '#FF6B6B', icon: Brain },
          { key: 'P', skill: null, label: 'P', type: 'normal' },
          { key: '[', skill: null, label: '{', type: 'function' },
          { key: ']', skill: null, label: '}', type: 'function' },
          { key: '\\', skill: null, label: '|', type: 'function' }
        ],
        [
          { key: 'CapsLock', skill: null, label: '⇪', type: 'function', width: 'w-20' },
          { key: 'A', skill: null, label: 'A', type: 'normal' },
          { key: 'S', skill: null, label: 'S', type: 'normal' },
          { key: 'D', skill: null, label: 'D', type: 'normal' },
          { key: 'F', skill: null, label: 'F', type: 'normal' },
          { key: 'G', skill: null, label: 'G', type: 'normal' },
          { key: 'H', skill: null, label: 'H', type: 'normal' },
          { key: 'J', skill: null, label: 'J', type: 'normal' },
          { key: 'K', skill: null, label: 'K', type: 'normal' },
          { key: 'L', skill: null, label: 'L', type: 'normal' },
          { key: ';', skill: null, label: ':', type: 'function' },
          { key: "'", skill: null, label: '"', type: 'function' },
          { key: 'Enter', skill: null, label: '⏎', type: 'function', width: 'w-24' }
        ],
        [
          { key: 'Shift', skill: null, label: '⇧', type: 'function', width: 'w-28' },
          { key: 'Z', skill: null, label: 'Z', type: 'normal' },
          { key: 'X', skill: null, label: 'X', type: 'normal' },
          { key: 'C', skill: null, label: 'C', type: 'normal' },
          { key: 'V', skill: null, label: 'V', type: 'normal' },
          { key: 'B', skill: null, label: 'B', type: 'normal' },
          { key: 'N', skill: null, label: 'N', type: 'normal' },
          { key: 'M', skill: null, label: 'M', type: 'normal' },
          { key: ',', skill: null, label: '<', type: 'function' },
          { key: '.', skill: null, label: '>', type: 'function' },
          { key: '/', skill: null, label: '?', type: 'function' },
          { key: 'Shift', skill: null, label: '⇧', type: 'function', width: 'w-28' }
        ],
        [
          { key: 'Ctrl', skill: null, label: 'Ctrl', type: 'function', width: 'w-16' },
          { key: 'Fn', skill: null, label: 'Fn', type: 'function', width: 'w-14' },
          { key: 'Alt', skill: null, label: 'Alt', type: 'function', width: 'w-16' },
          { key: 'Space', skill: 'Full Stack Development', level: 85, years: 1, projects: 5, color: '#6366F1', icon: Code, width: 'w-64', type: 'space' },
          { key: 'Alt', skill: null, label: 'Alt', type: 'function', width: 'w-16' },
          { key: 'Fn', skill: null, label: 'Fn', type: 'function', width: 'w-14' },
          { key: 'Menu', skill: null, label: '☰', type: 'function', width: 'w-14' },
          { key: 'Ctrl', skill: null, label: 'Ctrl', type: 'function', width: 'w-16' }
        ]
      ]
    },
    gaming: {
      name: 'Gaming Layout',
      theme: '#10B981',
      rows: [
        [
          { key: 'Esc', skill: null, label: 'Esc', type: 'function' },
          { key: 'F1', skill: 'HTML5', level: 95, years: 1, projects: 5, color: '#E34F26', icon: Code },
          { key: 'F2', skill: 'CSS3', level: 92, years: 1, projects: 5, color: '#1572B6', icon: Palette },
          { key: 'F3', skill: 'JavaScript', level: 85, years: 1, projects: 5, color: '#F7DF1E', icon: Zap },
          { key: 'F4', skill: 'React.js', level: 82, years: 1, projects: 5, color: '#61DAFB', icon: Layers },
          { key: 'F5', skill: 'Node.js', level: 75, years: 1, projects: 5, color: '#339933', icon: Cpu },
          { key: 'F6', skill: 'PHP', level: 80, years: 1, projects: 5, color: '#777BB4', icon: Code },
          { key: 'F7', skill: 'Python', level: 75, years: 1, projects: 5, color: '#3776AB', icon: Brain },
          { key: 'F8', skill: 'MySQL', level: 78, years: 1, projects: 5, color: '#4479A1', icon: Database },
          { key: 'F9', skill: 'MongoDB', level: 70, years: 1, projects: 5, color: '#47A248', icon: Database },
          { key: 'F10', skill: 'Git', level: 88, years: 1, projects: 5, color: '#F05032', icon: Code },
          { key: 'F11', skill: null, label: 'F11', type: 'function' },
          { key: 'F12', skill: null, label: 'F12', type: 'function' }
        ],
        [
          { key: '~', skill: null, label: '~', type: 'function' },
          { key: '1', skill: null, label: '1', type: 'normal' },
          { key: '2', skill: null, label: '2', type: 'normal' },
          { key: '3', skill: null, label: '3', type: 'normal' },
          { key: '4', skill: null, label: '4', type: 'normal' },
          { key: '5', skill: null, label: '5', type: 'normal' },
          { key: '6', skill: null, label: '6', type: 'normal' },
          { key: '7', skill: null, label: '7', type: 'normal' },
          { key: '8', skill: null, label: '8', type: 'normal' },
          { key: '9', skill: null, label: '9', type: 'normal' },
          { key: '0', skill: null, label: '0', type: 'normal' },
          { key: '-', skill: null, label: '-', type: 'function' },
          { key: '=', skill: null, label: '=', type: 'function' }
        ]
      ]
    },
    minimal: {
      name: 'Minimal Grid',
      theme: '#8B5CF6',
      rows: [
        [
          { key: 'HTML', skill: 'HTML5', level: 95, years: 1, projects: 5, color: '#E34F26', icon: Code, width: 'w-24' },
          { key: 'CSS', skill: 'CSS3', level: 92, years: 1, projects: 5, color: '#1572B6', icon: Palette, width: 'w-24' },
          { key: 'JS', skill: 'JavaScript', level: 85, years: 1, projects: 5, color: '#F7DF1E', icon: Zap, width: 'w-24' },
          { key: 'React', skill: 'React.js', level: 82, years: 1, projects: 5, color: '#61DAFB', icon: Layers, width: 'w-24' },
          { key: 'Node', skill: 'Node.js', level: 75, years: 1, projects: 5, color: '#339933', icon: Cpu, width: 'w-24' }
        ],
        [
          { key: 'PHP', skill: 'PHP', level: 80, years: 1, projects: 5, color: '#777BB4', icon: Code, width: 'w-24' },
          { key: 'Python', skill: 'Python', level: 75, years: 1, projects: 5, color: '#3776AB', icon: Brain, width: 'w-24' },
          { key: 'MySQL', skill: 'MySQL', level: 78, years: 1, projects: 5, color: '#4479A1', icon: Database, width: 'w-24' },
          { key: 'Mongo', skill: 'MongoDB', level: 70, years: 1, projects: 5, color: '#47A248', icon: Database, width: 'w-24' },
          { key: 'Git', skill: 'Git', level: 88, years: 1, projects: 5, color: '#F05032', icon: Code, width: 'w-24' }
        ],
        [
          { key: 'C', skill: 'C', level: 85, years: 1, projects: 5, color: '#A8B9CC', icon: Cpu, width: 'w-24' },
          { key: 'C++', skill: 'C++', level: 82, years: 1, projects: 5, color: '#00599C', icon: Layers, width: 'w-24' },
          { key: 'ML', skill: 'Machine Learning', level: 65, years: 1, projects: 5, color: '#FF6B6B', icon: Brain, width: 'w-24' },
          { key: 'API', skill: 'RESTful APIs', level: 72, years: 1, projects: 5, color: '#FF4500', icon: Wifi, width: 'w-24' },
          { key: 'Tools', skill: 'VS Code', level: 95, years: 1, projects: 5, color: '#007ACC', icon: Monitor, width: 'w-24' }
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

  // Keyboard input handling
  useEffect(() => {
    if (!isTypingMode) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => new Set(prev).add(key));
      
      // Find skill for this key
      const currentLayout = skillKeyboard[keyboardLayout];
      const foundKey = currentLayout.rows.flat().find(k => 
        k.key.toUpperCase() === key && k.skill
      );
      
      if (foundKey) {
        setSelectedKey(foundKey);
        setTypedSequence(prev => prev + key);
        
        // Play sound effect
        if (soundEnabled) {
          // Create audio feedback
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
  }, [isTypingMode, keyboardLayout, soundEnabled]);

  const resetRotation = () => {
    setRotationX(-10);
    setRotationY(0);
    setRotationZ(0);
  };

  const getKeyStyle = (keyData) => {
    const isPressed = pressedKeys.has(keyData.key.toUpperCase());
    const isSelected = selectedKey?.key === keyData.key;
    const hasSkill = keyData.skill;
    
    let baseClasses = `
      h-12 rounded-lg font-mono font-bold text-sm transition-all duration-150 transform
      ${keyData.width || 'w-12'} 
      ${isPressed ? 'scale-95 shadow-inner' : 'shadow-lg hover:shadow-xl'} 
      ${isSelected ? 'ring-2 ring-blue-400 ring-opacity-75' : ''}
      ${hasSkill ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
    `;

    if (keyData.type === 'function') {
      return `${baseClasses} bg-gray-700 hover:bg-gray-600 text-gray-300 border-2 border-gray-600`;
    } else if (keyData.type === 'space') {
      return `${baseClasses} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-2 border-purple-500`;
    } else if (hasSkill) {
      return `${baseClasses} bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-600 hover:border-gray-500`;
    } else {
      return `${baseClasses} bg-gray-800 hover:bg-gray-700 text-gray-300 border-2 border-gray-600`;
    }
  };

  const getKeyContent = (keyData) => {
    if (keyData.skill) {
      const IconComponent = keyData.icon;
      return (
        <div className="flex flex-col items-center justify-center h-full relative">
          <IconComponent size={16} style={{ color: keyData.color }} />
          <div className="text-xs text-gray-300 mt-1 truncate w-full text-center">
            {keyData.skill.length > 8 ? keyData.skill.substring(0, 6) + '..' : keyData.skill}
          </div>
          {/* Skill level indicator */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded"
            style={{ width: `${keyData.level}%` }}
          />
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
          console.log('Hello World');
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
                Interactive Keyboard
              </span>
            </h2>
            <Keyboard className="w-12 h-12 text-blue-400 ml-4 animate-bounce" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-mono">
            Type to explore my skills • Each key represents a technology
          </p>
          
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
          {/* Layout Selector */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 border border-gray-600">
            <Monitor className="w-5 h-5 text-blue-400" />
            <span className="text-gray-300 text-sm">Layout:</span>
            <select
              value={keyboardLayout}
              onChange={(e) => setKeyboardLayout(e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-1 text-sm border border-gray-600 focus:border-blue-400"
            >
              {Object.entries(skillKeyboard).map(([key, layout]) => (
                <option key={key} value={key}>{layout.name}</option>
              ))}
            </select>
          </div>

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
                            if (keyData.skill) {
                              setSelectedKey(keyData);
                              setTypedSequence(prev => prev + keyData.key);
                            }
                          }}
                          onMouseEnter={() => {
                            if (keyData.skill) {
                              // Slight key highlight on hover
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

        {/* Selected Skill Details */}
        {selectedKey && selectedKey.skill && (
          <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg"
                    style={{ backgroundColor: `${selectedKey.color}20` }}
                  >
                    <selectedKey.icon size={32} style={{ color: selectedKey.color }} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white font-mono">{selectedKey.skill}</h3>
                    <p className="text-gray-300">Mapped to key: <span className="font-mono bg-gray-800 px-2 py-1 rounded">{selectedKey.key}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedKey(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedKey.level}%</div>
                  <div className="text-gray-400 text-sm">Proficiency</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <HardDrive className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedKey.years}</div>
                  <div className="text-gray-400 text-sm">Year{selectedKey.years !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Monitor className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-2xl font-bold text-white mb-1">{selectedKey.projects}</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 text-center">
                  <Keyboard className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                  <div className="text-lg font-bold text-white mb-1">{selectedKey.key}</div>
                  <div className="text-gray-400 text-sm">Key Binding</div>
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
                <kbd className="bg-gray-800 px-2 py-1 rounded">WASD</kbd> - Navigate
              </div>
              <div>
                <kbd className="bg-gray-800 px-2 py-1 rounded">1-0</kbd> - Select Skills  
              </div>
              <div>
                <kbd className="bg-gray-800 px-2 py-1 rounded">Mouse</kbd> - 3D Rotation
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Start typing to interact with skills • Each key press creates audio feedback • Move mouse to rotate keyboard in 3D space
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
