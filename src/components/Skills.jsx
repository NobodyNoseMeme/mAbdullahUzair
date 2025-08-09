import { useState, useEffect, useRef } from 'react';
import { Code, Server, Database, Palette, Brain, Zap, Globe, Monitor, Star, Trophy, Target, Award } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Staggered animation phases
          setTimeout(() => setAnimationPhase(1), 500);
          setTimeout(() => setAnimationPhase(2), 1000);
          setTimeout(() => setAnimationPhase(3), 1500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = {
    frontend: {
      title: 'Frontend Mastery',
      icon: Globe,
      color: 'from-blue-400 via-purple-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      skills: [
        { name: 'HTML5', level: 95, icon: '🌐', experience: '2 years', projects: 15 },
        { name: 'CSS3', level: 92, icon: '🎨', experience: '2 years', projects: 15 },
        { name: 'JavaScript', level: 85, icon: '⚡', experience: '1.5 years', projects: 12 },
        { name: 'Bootstrap', level: 88, icon: '🅱️', experience: '1 year', projects: 10 },
        { name: 'Tailwind CSS', level: 90, icon: '💨', experience: '1 year', projects: 8 },
        { name: 'Responsive Design', level: 93, icon: '📱', experience: '2 years', projects: 15 }
      ]
    },
    backend: {
      title: 'Backend Engineering',
      icon: Server,
      color: 'from-green-400 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      skills: [
        { name: 'PHP', level: 80, icon: '🐘', experience: '1 year', projects: 8 },
        { name: 'Node.js', level: 75, icon: '🟢', experience: '1 year', projects: 6 },
        { name: 'Express.js', level: 75, icon: '⚡', experience: '1 year', projects: 6 },
        { name: 'RESTful APIs', level: 72, icon: '🔗', experience: '1 year', projects: 8 }
      ]
    },
    database: {
      title: 'Data & Tools',
      icon: Database,
      color: 'from-purple-400 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      skills: [
        { name: 'MySQL', level: 78, icon: '🐬', experience: '1 year', projects: 6 },
        { name: 'MongoDB', level: 70, icon: '🍃', experience: '8 months', projects: 4 },
        { name: 'Git & GitHub', level: 88, icon: '🔧', experience: '1.5 years', projects: 15 },
        { name: 'VS Code', level: 95, icon: '💻', experience: '2 years', projects: 15 },
        { name: 'Postman', level: 80, icon: '📮', experience: '1 year', projects: 8 }
      ]
    },
    programming: {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-orange-400 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      skills: [
        { name: 'C', level: 85, icon: '⚙️', experience: '1.5 years', projects: 10 },
        { name: 'C++', level: 82, icon: '🔧', experience: '1.5 years', projects: 8 },
        { name: 'JavaScript', level: 85, icon: '🟨', experience: '1.5 years', projects: 12 },
        { name: 'Python', level: 75, icon: '🐍', experience: '1 year', projects: 6 },
        { name: 'Machine Learning', level: 65, icon: '🤖', experience: '6 months', projects: 3 }
      ]
    }
  };

  const getSkillColor = (level) => {
    if (level >= 90) return 'text-green-600';
    if (level >= 80) return 'text-blue-600';
    if (level >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getSkillBadge = (level) => {
    if (level >= 90) return { icon: Trophy, label: 'Expert', color: 'bg-green-500' };
    if (level >= 80) return { icon: Award, label: 'Advanced', color: 'bg-blue-500' };
    if (level >= 70) return { icon: Target, label: 'Proficient', color: 'bg-orange-500' };
    return { icon: Star, label: 'Learning', color: 'bg-red-500' };
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full opacity-20 animate-pulse ${
              i % 4 === 0 ? 'bg-blue-400' : 
              i % 4 === 1 ? 'bg-purple-400' : 
              i % 4 === 2 ? 'bg-green-400' : 'bg-orange-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dynamic Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Mastering technologies to build amazing digital experiences
          </p>
          
          {/* Interactive Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 transition-all duration-1000 delay-500 ${
            animationPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-purple-600">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-green-600">2+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Proficiency</div>
            </div>
          </div>
        </div>

        {/* Interactive Skill Categories */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-700 ${
          animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          {Object.entries(skillCategories).map(([key, category], index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCategory === key;
            
            return (
              <div
                key={key}
                className={`relative bg-gradient-to-br ${category.bgGradient} rounded-3xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                  isHovered ? 'ring-4 ring-purple-400 ring-opacity-50' : ''
                }`}
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setActiveSkill(activeSkill === key ? null : key)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-300 ${
                    isHovered ? 'scale-110 rotate-12' : ''
                  }`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {category.skills.length} Technologies
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </div>
                    <div className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white`}>
                      View Skills
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Skills Display */}
        {activeSkill && (
          <div className={`transition-all duration-1000 ${
            animationPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {skillCategories[activeSkill].title}
                </h3>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillCategories[activeSkill].skills.map((skill, index) => {
                  const badge = getSkillBadge(skill.level);
                  const BadgeIcon = badge.icon;
                  
                  return (
                    <div
                      key={skill.name}
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{skill.icon}</div>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${badge.color} text-white text-xs`}>
                          <BadgeIcon size={12} />
                          <span>{badge.label}</span>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {skill.name}
                      </h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency</span>
                            <span className={`text-sm font-bold ${getSkillColor(skill.level)}`}>
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className={`h-full bg-gradient-to-r ${skillCategories[activeSkill].color} rounded-full transition-all duration-1000 ease-out`}
                              style={{
                                width: `${skill.level}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Experience: {skill.experience}</span>
                          <span>Projects: {skill.projects}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's collaborate and turn your ideas into reality with these technologies
            </p>
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-purple-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
