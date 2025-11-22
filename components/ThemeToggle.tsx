import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to system preference
      setTheme('system');
      applyTheme('system');
    }

    // Initial dark mode check
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem('theme') as Theme;
      if (currentTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (selectedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'system', icon: <HiOutlineComputerDesktop className="w-4 h-4" />, label: 'System' },
    { value: 'light', icon: <IoSunnyOutline className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <IoMoonOutline className="w-4 h-4" />, label: 'Dark' },
  ];

  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 transition-colors backdrop-blur-sm ${
        isDarkMode
          ? 'bg-background-dark/30 border border-border-dark-mode'
          : 'bg-background/30 border border-border'
      }`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleThemeChange(option.value)}
          className={`relative px-2.5 py-1.5 rounded-full transition-all duration-200 ${
            theme === option.value
              ? isDarkMode
                ? 'text-text-dark-primary'
                : 'text-text-primary'
              : isDarkMode
              ? 'text-text-dark-tertiary hover:text-text-dark-secondary'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
          aria-label={option.label}
        >
          {theme === option.value && (
            <motion.div
              layoutId="activeTheme"
              className={`absolute inset-0 rounded-full ${
                isDarkMode ? 'bg-background-dark/60' : 'bg-white/60'
              }`}
              style={{ boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.icon}</span>
        </button>
      ))}
    </div>
  );
}
