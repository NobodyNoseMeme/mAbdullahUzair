import { useState, useEffect, useRef } from 'react';
import { Code, Server, Database, Palette, Brain, Zap, Globe, Monitor } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const sectionRef = useRef(null);

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

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML5', level: 95, icon: '🌐' },
        { name: 'CSS3', level: 92, icon: '🎨' },
        { name: 'JavaScript', level: 85, icon: '🟨' },
        { name: 'Bootstrap', level: 88, icon: '🅱️' },
        { name: 'Tailwind CSS', level: 90, icon: '💨' },
        { name: 'Responsive Design', level: 93, icon: '📱' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PHP', level: 80, icon: '🐘' },
        { name: 'Node.js', level: 75, icon: '🟢' },
        { name: 'Express.js', level: 75, icon: '⚡' },
        { name: 'RESTful APIs', level: 72, icon: '🔗' }
      ]
    },
    database: {
      title: 'Database & Tools',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MySQL', level: 78, icon: '🐬' },
        { name: 'MongoDB', level: 70, icon: '🍃' },
        { name: 'Git & GitHub', level: 88, icon: '🔧' },
        { name: 'VS Code', level: 95, icon: '💻' },
        { name: 'Postman', level: 80, icon: '📮' }
      ]
    },
    programming: {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'C', level: 85, icon: '⚙️' },
        { name: 'C++', level: 82, icon: '🔧' },
        { name: 'JavaScript', level: 85, icon: '🟨' },
        { name: 'Python', level: 75, icon: '🐍' },
        { name: 'Machine Learning', level: 65, icon: '🤖' }
      ]
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-20 bg-white dark:bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Technical Skills
          </h2>
          <p className={`text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Expertise across the full development stack
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center mb-12 gap-2 md:gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent size={18} className="mr-2" />
                <span className="text-sm md:text-base">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Skill Header */}
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3 bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-xl flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                      {skill.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {skill.level}% Proficiency
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold">15+</div>
            <div className="text-xs md:text-sm opacity-90">Technologies</div>
          </div>
          <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold">10+</div>
            <div className="text-xs md:text-sm opacity-90">Projects</div>
          </div>
          <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold">1+</div>
            <div className="text-xs md:text-sm opacity-90">Years Experience</div>
          </div>
          <div className="text-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold">85%</div>
            <div className="text-xs md:text-sm opacity-90">Avg Proficiency</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
