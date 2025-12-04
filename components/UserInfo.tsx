import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiClock } from 'react-icons/hi';

interface UserInfoProps {
  isDarkMode: boolean;
}

export default function UserInfo({ isDarkMode }: UserInfoProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [city, setCity] = useState<string>('Locating...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const getUserLocationByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');

        if (response.ok) {
          const data = await response.json();
          const userCity = data.city || data.region || data.country_name || 'Unknown';
          setCity(userCity);
        } else {
          try {
            const fallbackResponse = await fetch('https://ip-api.com/json/');
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              const userCity = fallbackData.city || fallbackData.regionName || fallbackData.country || 'Unknown';
              setCity(userCity);
            } else {
              setCity('Unknown');
            }
          } catch (fallbackError) {
            console.error('Fallback location error:', fallbackError);
            setCity('Unknown');
          }
        }
      } catch (error) {
        console.error('Error fetching location by IP:', error);
        try {
          const fallbackResponse = await fetch('https://ip-api.com/json/');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            const userCity = fallbackData.city || fallbackData.regionName || fallbackData.country || 'Unknown';
            setCity(userCity);
          } else {
            setCity('Unknown');
          }
        } catch (fallbackError) {
          console.error('All location services failed:', fallbackError);
          setCity('Unknown');
        }
      } finally {
        setLoading(false);
      }
    };

    getUserLocationByIP();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-4 text-xs ${
        isDarkMode ? 'text-text-dark-secondary' : 'text-text-secondary'
      }`}
    >
      <motion.div
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <HiClock className={`text-sm ${isDarkMode ? 'text-text-dark-primary' : 'text-text-primary'}`} />
        <span className="font-mono">{currentTime}</span>
      </motion.div>

      <div className={`w-px h-4 ${isDarkMode ? 'bg-border-dark-mode' : 'bg-border'}`} />

      <motion.div
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <HiLocationMarker className={`text-sm ${isDarkMode ? 'text-text-dark-primary' : 'text-text-primary'}`} />
        {loading ? (
          <motion.span
            className="font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {city}
          </motion.span>
        ) : (
          <span className="font-mono">{city}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
