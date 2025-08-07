import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Mouse tracking for interactive effects - disabled on mobile for performance
  useEffect(() => {
    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame || window.innerWidth <= 768) return;
      animationFrame = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
        animationFrame = null;
      });
    };

    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'abdullahuzair860@gmail.com',
      href: 'mailto:abdullahuzair860@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 303 467 3255',
      href: 'tel:+923034673255',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lahore, Pakistan',
      href: '#',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Interactive Background - Reduced particles on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles that follow mouse */}
        {[...Array(window.innerWidth > 768 ? 15 : 5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: window.innerWidth > 768 ? `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` : 'none',
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
        
        {/* Gradient orbs - Smaller on mobile */}
        <div className="absolute top-20 left-10 md:left-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 md:right-20 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16 px-2 md:px-4">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Ready to bring your ideas to life?
            <br className="hidden sm:block" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Let's create something amazing together!</span>
          </p>
          <div className={`mt-4 md:mt-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start px-2 md:px-4 lg:px-0">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                  <Sparkles className="mr-3 text-purple-500" size={20} />
                  Get In Touch
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 md:mb-8 leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing people. 
                  Whether you have a project in mind or just want to say hello, feel free to reach out!
                </p>
                
                <div className="space-y-3 md:space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="group flex items-center p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl hover:shadow-lg transition-all duration-300 transform md:hover:scale-105 md:hover:translateX-2"
                      >
                        <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${info.color} rounded-lg md:rounded-xl flex items-center justify-center text-white transform md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                          <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="ml-3 md:ml-4">
                          <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400">{info.label}</p>
                          <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Fun Quote */}
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl md:rounded-3xl p-3 md:p-4 lg:p-6 text-white transform md:hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-2 md:mb-4">
                  <Heart className="mr-3 text-pink-200" size={20} />
                  <h4 className="text-base md:text-lg font-bold">Let's Create Magic!</h4>
                </div>
                <p className="text-sm md:text-base text-purple-100 leading-relaxed">
                  "Every great project starts with a simple conversation. Let's turn your vision into reality!"
                </p>
              </div>
            </div>
          </div>

          {/* Unique Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Form Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-blue-500" size={20} />
                  Send Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lg:space-y-6">
                  {/* Name Field */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-30' : ''}`} />
                    <div className="relative">
                      <User className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-purple-500' : 'text-gray-400'}`} size={16} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Name"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-30' : ''}`} />
                    <div className="relative">
                      <Mail className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} size={16} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Email"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'subject' ? 'opacity-30' : ''}`} />
                    <div className="relative">
                      <Sparkles className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'subject' ? 'text-green-500' : 'text-gray-400'}`} size={16} />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Subject"
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'subject' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-30' : ''}`} />
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 md:left-4 top-4 md:top-6 transition-colors duration-300 ${focusedField === 'message' ? 'text-pink-500' : 'text-gray-400'}`} size={16} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your Message"
                        rows={4}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 text-sm md:text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 md:py-4 text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl md:rounded-2xl font-semibold transition-all duration-300 transform md:hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-2 md:mr-3" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} className="mr-2 md:mr-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse" />
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-50 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
