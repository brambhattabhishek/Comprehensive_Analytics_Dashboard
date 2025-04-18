
import { motion } from "framer-motion";

interface AnimatedWeatherIconProps {
  weatherCode: string;
  size?: number;
  className?: string;
}

export function AnimatedWeatherIcon({ 
  weatherCode, 
  size = 64, 
  className 
}: AnimatedWeatherIconProps) {
  // Map OpenWeatherMap icon codes to animated components
  const getWeatherAnimation = () => {
    // Extract the main part of the code (e.g., "01d" -> "01")
    const code = weatherCode.slice(0, 2);
    const isDay = weatherCode.endsWith("d");

    switch (code) {
      case "01": // Clear sky
        return isDay ? (
          <SunAnimation size={size} />
        ) : (
          <MoonAnimation size={size} />
        );
      case "02": // Few clouds
      case "03": // Scattered clouds
      case "04": // Broken clouds
        return isDay ? (
          <CloudySunAnimation size={size} />
        ) : (
          <CloudyMoonAnimation size={size} />
        );
      case "09": // Shower rain
        return <RainAnimation size={size} />;
      case "10": // Rain
        return isDay ? (
          <RainySunAnimation size={size} />
        ) : (
          <RainyMoonAnimation size={size} />
        );
      case "11": // Thunderstorm
        return <ThunderstormAnimation size={size} />;
      case "13": // Snow
        return <SnowAnimation size={size} />;
      case "50": // Mist/Fog
        return <FogAnimation size={size} />;
      default:
        // Fallback to the standard weather icon from OpenWeatherMap
        return (
          <img
            src={`https://openweathermap.org/img/wn/${weatherCode}@2x.png`}
            alt="Weather icon"
            width={size}
            height={size}
            className={className}
          />
        );
    }
  };

  return (
    <div className={className} style={{ width: size, height: size }}>
      {getWeatherAnimation()}
    </div>
  );
}

// Animation components for different weather types
function SunAnimation({ size }: { size: number }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute rounded-full bg-warning"
        style={{ width: size * 0.7, height: size * 0.7 }}
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(255, 191, 0, 0.6)",
            "0 0 16px 4px rgba(255, 191, 0, 0.6)",
            "0 0 8px 2px rgba(255, 191, 0, 0.6)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-warning"
            style={{
              width: size * 0.06,
              height: size * 0.2,
              left: "50%",
              top: "50%",
              transformOrigin: "bottom center",
              transform: `translate(-50%, -100%) rotate(${i * 45}deg) translateY(-${
                size * 0.35
              }px)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

function MoonAnimation({ size }: { size: number }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute rounded-full bg-muted"
        style={{ width: size * 0.7, height: size * 0.7 }}
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(255, 255, 255, 0.3)",
            "0 0 12px 3px rgba(255, 255, 255, 0.3)",
            "0 0 8px 2px rgba(255, 255, 255, 0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-background"
        style={{
          width: size * 0.55,
          height: size * 0.55,
          top: size * 0.1,
          right: size * 0.1,
        }}
      />
    </motion.div>
  );
}

function CloudySunAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute"
        style={{ top: 0, left: 0 }}
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <SunAnimation size={size * 0.7} />
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.5,
          height: size * 0.3,
          bottom: size * 0.2,
          left: size * 0.1,
          zIndex: 10,
        }}
        animate={{ x: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.6,
          height: size * 0.35,
          bottom: size * 0.1,
          right: size * 0.1,
          zIndex: 20,
        }}
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function CloudyMoonAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute"
        style={{ top: 0, left: 0 }}
        animate={{ x: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <MoonAnimation size={size * 0.7} />
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.5,
          height: size * 0.3,
          bottom: size * 0.2,
          left: size * 0.1,
          zIndex: 10,
        }}
        animate={{ x: [2, -2, 2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.6,
          height: size * 0.35,
          bottom: size * 0.1,
          right: size * 0.1,
          zIndex: 20,
        }}
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function RainAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.8,
          height: size * 0.4,
          top: size * 0.1,
          left: size * 0.1,
        }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: size * 0.05,
            height: size * 0.1,
            left: size * (0.2 + i * 0.15),
            top: size * 0.5,
          }}
          animate={{
            y: [0, size * 0.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

function RainySunAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute"
        style={{ top: 0, left: 0 }}
      >
        <SunAnimation size={size * 0.7} />
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.6,
          height: size * 0.35,
          bottom: size * 0.25,
          right: size * 0.1,
          zIndex: 20,
        }}
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: size * 0.04,
            height: size * 0.08,
            right: size * (0.15 + i * 0.12),
            bottom: size * 0.1,
            zIndex: 30,
          }}
          animate={{
            y: [0, size * 0.2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

function RainyMoonAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute"
        style={{ top: 0, left: 0 }}
      >
        <MoonAnimation size={size * 0.7} />
      </motion.div>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.6,
          height: size * 0.35,
          bottom: size * 0.25,
          right: size * 0.1,
          zIndex: 20,
        }}
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: size * 0.04,
            height: size * 0.08,
            right: size * (0.15 + i * 0.12),
            bottom: size * 0.1,
            zIndex: 30,
          }}
          animate={{
            y: [0, size * 0.2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

function ThunderstormAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full bg-muted/90"
        style={{
          width: size * 0.8,
          height: size * 0.4,
          top: size * 0.1,
          left: size * 0.1,
        }}
        animate={{ 
          y: [-2, 2, -2],
          filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute"
        style={{
          width: size * 0.25,
          height: size * 0.35,
          top: size * 0.4,
          left: size * 0.35,
          zIndex: 20,
        }}
        animate={{
          opacity: [0, 1, 0.5, 0],
          scale: [0.8, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 2.5,
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M50 5 L65 50 L40 50 L50 95" 
            strokeWidth="12" 
            stroke="#FFD700" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: size * 0.04,
            height: size * 0.08,
            left: size * (0.15 + i * 0.15),
            top: size * 0.5,
          }}
          animate={{
            y: [0, size * 0.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

function SnowAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full bg-background/90 border border-muted"
        style={{
          width: size * 0.8,
          height: size * 0.4,
          top: size * 0.1,
          left: size * 0.1,
        }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: size * 0.1,
            height: size * 0.1,
            left: size * (0.2 + i * 0.15 - (i % 2) * 0.1),
            top: size * 0.5,
          }}
          animate={{
            y: [0, size * 0.3, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        >
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" 
              strokeWidth="8" 
              stroke="white" 
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function FogAnimation({ size }: { size: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-muted/80"
          style={{
            width: size * 0.7,
            height: size * 0.1,
            left: size * 0.15,
            top: size * (0.2 + i * 0.2),
          }}
          animate={{
            x: i % 2 === 0 ? [0, size * 0.1, 0] : [0, -size * 0.1, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
