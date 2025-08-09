import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects3D from './components/Projects3D';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import './App.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Optimized cursor effect with better performance
  useEffect(() => {
    // Disable cursor effects on mobile devices
    if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

    let lastTime = 0;
    const throttleDelay = 32; // ~30fps for smoother performance
    let trailPool = [];
    const maxTrails = 5; // Reduced trail count

    const createTrail = (e) => {
      const now = performance.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      let trail = trailPool.pop();
      if (!trail) {
        trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
          position: fixed;
          width: 6px;
          height: 6px;
          background: rgba(147, 51, 234, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        `;
      }

      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = '1';

      document.body.appendChild(trail);

      setTimeout(() => {
        if (document.body.contains(trail)) {
          trail.style.opacity = '0';
          trail.style.transform = 'translate(-50%, -50%) scale(0.3)';
          trail.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';

          setTimeout(() => {
            if (document.body.contains(trail)) {
              document.body.removeChild(trail);
              if (trailPool.length < maxTrails) {
                trailPool.push(trail);
              }
            }
          }, 400);
        }
      }, 50);
    };

    // Simpler cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 18px;
      height: 18px;
      background: rgba(147, 51, 234, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.1s ease-out;
      transform: translate(-50%, -50%);
      border: 1px solid rgba(147, 51, 234, 0.3);
    `;
    document.body.appendChild(cursor);
    document.body.style.cursor = 'none';

    const updateCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', createTrail, { passive: true });
    document.addEventListener('mousemove', updateCursor, { passive: true });

    return () => {
      document.removeEventListener('mousemove', createTrail);
      document.removeEventListener('mousemove', updateCursor);
      document.body.style.cursor = 'auto';

      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }

      const trails = document.querySelectorAll('.cursor-trail');
      trails.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300" style={{ cursor: window.innerWidth <= 768 || 'ontouchstart' in window ? 'auto' : 'none' }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects3D />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}

export default App;
