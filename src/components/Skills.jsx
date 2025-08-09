import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Filter, Search, TrendingUp } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('network'); // network, grid, radar
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      skills: [
        { name: 'HTML5', level: 95, years: 2, projects: 15, connections: ['CSS3', 'JavaScript', 'Bootstrap'] },
        { name: 'CSS3', level: 92, years: 2, projects: 15, connections: ['HTML5', 'Bootstrap', 'Tailwind CSS'] },
        { name: 'JavaScript', level: 85, years: 1.5, projects: 12, connections: ['HTML5', 'Node.js', 'React.js'] },
        { name: 'Bootstrap', level: 88, years: 1, projects: 10, connections: ['HTML5', 'CSS3', 'Responsive Design'] },
        { name: 'Tailwind CSS', level: 90, years: 1, projects: 8, connections: ['CSS3', 'Responsive Design'] },
        { name: 'Responsive Design', level: 93, years: 2, projects: 15, connections: ['CSS3', 'Bootstrap', 'Tailwind CSS'] }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      skills: [
        { name: 'PHP', level: 80, years: 1, projects: 8, connections: ['MySQL', 'RESTful APIs'] },
        { name: 'Node.js', level: 75, years: 1, projects: 6, connections: ['JavaScript', 'Express.js', 'MongoDB'] },
        { name: 'Express.js', level: 75, years: 1, projects: 6, connections: ['Node.js', 'RESTful APIs'] },
        { name: 'RESTful APIs', level: 72, years: 1, projects: 8, connections: ['PHP', 'Express.js', 'Postman'] }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      skills: [
        { name: 'MySQL', level: 78, years: 1, projects: 6, connections: ['PHP', 'Database Design'] },
        { name: 'MongoDB', level: 70, years: 0.8, projects: 4, connections: ['Node.js', 'Database Design'] },
        { name: 'Git & GitHub', level: 88, years: 1.5, projects: 15, connections: ['VS Code', 'Version Control'] },
        { name: 'VS Code', level: 95, years: 2, projects: 15, connections: ['Git & GitHub', 'Development Tools'] },
        { name: 'Postman', level: 80, years: 1, projects: 8, connections: ['RESTful APIs', 'Testing'] }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      skills: [
        { name: 'C', level: 85, years: 1.5, projects: 10, connections: ['C++', 'System Programming'] },
        { name: 'C++', level: 82, years: 1.5, projects: 8, connections: ['C', 'Object-Oriented Programming'] },
        { name: 'Python', level: 75, years: 1, projects: 6, connections: ['Machine Learning', 'Data Analysis'] },
        { name: 'Machine Learning', level: 65, years: 0.5, projects: 3, connections: ['Python', 'Data Analysis'] }
      ]
    }
  };

  // Flatten all skills for network view
  const allSkills = Object.entries(skillsData).flatMap(([category, data]) => 
    data.skills.map(skill => ({ ...skill, category, categoryColor: data.color }))
  );

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

  // Network visualization effect
  useEffect(() => {
    if (!isVisible || viewMode !== 'network' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Create skill nodes with positions
    const nodes = allSkills.map((skill, index) => {
      const angle = (index / allSkills.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.3;
      const centerX = width / 2;
      const centerY = height / 2;
      
      return {
        ...skill,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius: Math.max(skill.level * 0.8, 30),
        targetX: centerX + Math.cos(angle) * radius,
        targetY: centerY + Math.sin(angle) * radius
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      nodes.forEach(node => {
        if (node.connections) {
          node.connections.forEach(connectionName => {
            const connectedNode = nodes.find(n => n.name === connectionName);
            if (connectedNode) {
              ctx.strokeStyle = hoveredSkill === node.name || hoveredSkill === connectedNode.name 
                ? node.categoryColor + '80'
                : '#E5E7EB40';
              ctx.lineWidth = hoveredSkill === node.name || hoveredSkill === connectedNode.name ? 2 : 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(connectedNode.x, connectedNode.y);
              ctx.stroke();
            }
          });
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isHovered = hoveredSkill === node.name;
        const isSelected = selectedSkill?.name === node.name;
        
        // Outer glow for hovered/selected
        if (isHovered || isSelected) {
          ctx.shadowColor = node.categoryColor;
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowBlur = 0;
        }

        // Node circle
        ctx.fillStyle = node.categoryColor + (isHovered || isSelected ? 'FF' : 'CC');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, 2 * Math.PI);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;

        // Node text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${isHovered || isSelected ? '600' : '500'} ${Math.max(node.radius * 0.15, 10)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Truncate long names
        let displayName = node.name.length > 8 ? node.name.substring(0, 8) + '...' : node.name;
        ctx.fillText(displayName, node.x, node.y);

        // Skill level indicator
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, (node.level / 100) * 2 * Math.PI);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let hoveredNode = null;
      nodes.forEach(node => {
        const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        if (distance < node.radius * 0.5) {
          hoveredNode = node.name;
        }
      });

      setHoveredSkill(hoveredNode);
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      nodes.forEach(node => {
        const distance = Math.sqrt((mouseX - node.x) ** 2 + (mouseY - node.y) ** 2);
        if (distance < node.radius * 0.5) {
          setSelectedSkill(node);
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [isVisible, viewMode, hoveredSkill, selectedSkill, allSkills]);

  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSkillLevelLabel = (level) => {
    if (level >= 90) return { label: 'Expert', color: 'text-green-600 bg-green-100' };
    if (level >= 80) return { label: 'Advanced', color: 'text-blue-600 bg-blue-100' };
    if (level >= 70) return { label: 'Proficient', color: 'text-orange-600 bg-orange-100' };
    return { label: 'Learning', color: 'text-red-600 bg-red-100' };
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Interactive visualization of my technical skills and their interconnections
          </p>
        </div>

        {/* Controls */}
        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none"
            >
              <option value="all">All Categories</option>
              {Object.entries(skillsData).map(([key, data]) => (
                <option key={key} value={key}>{data.name}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
            {['network', 'grid'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {viewMode === 'network' ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Network Visualization */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills Network</h3>
                  <canvas
                    ref={canvasRef}
                    className="w-full h-96 rounded-xl cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    Hover over nodes to see connections • Click to view details
                  </p>
                </div>
              </div>

              {/* Skill Details */}
              <div className="space-y-6">
                {/* Selected Skill Details */}
                {selectedSkill && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                      <button
                        onClick={() => setSelectedSkill(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Proficiency */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Proficiency</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getSkillLevelLabel(selectedSkill.level).color}`}>
                            {getSkillLevelLabel(selectedSkill.level).label}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${selectedSkill.level}%`,
                              backgroundColor: selectedSkill.categoryColor
                            }}
                          />
                        </div>
                        <div className="text-right text-sm font-bold mt-1" style={{ color: selectedSkill.categoryColor }}>
                          {selectedSkill.level}%
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.years}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Years</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSkill.projects}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
                        </div>
                      </div>

                      {/* Connected Skills */}
                      {selectedSkill.connections && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Connected Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedSkill.connections.map((connection, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
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

                {/* Category Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills Overview</h3>
                  <div className="space-y-4">
                    {Object.entries(skillsData).map(([key, data]) => {
                      const avgLevel = Math.round(data.skills.reduce((acc, skill) => acc + skill.level, 0) / data.skills.length);
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{data.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{data.skills.length} skills</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold" style={{ color: data.color }}>{avgLevel}%</div>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${avgLevel}%`,
                                  backgroundColor: data.color
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => {
                const levelInfo = getSkillLevelLabel(skill.level);
                return (
                  <div
                    key={skill.name}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-200 dark:border-gray-700"
                    onClick={() => setSelectedSkill(skill)}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${levelInfo.color}`}>
                        {levelInfo.label}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                        <span className="text-sm font-bold" style={{ color: skill.categoryColor }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.categoryColor
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{skill.years} years</span>
                      <span>{skill.projects} projects</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <TrendingUp className="mr-3" size={28} />
              Ready to Leverage These Skills?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's collaborate and build something amazing with these technologies
            </p>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              Start a Project
              <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
