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

  // Cursor effects completely removed for better performance

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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
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
