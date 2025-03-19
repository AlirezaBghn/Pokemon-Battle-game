import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import LoadingScreen from "../components/LoadingScreen"; // Import LoadingScreen

const HeroSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredPokeball, setHoveredPokeball] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [contentLoaded, setContentLoaded] = useState(false); // Track actual content loading

  // Track language changes to rerender component when language changes
  const [currentLang, setCurrentLang] = useState(i18n.language);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Mark content as loaded when particles and images have loaded
  useEffect(() => {
    // Add a timeout to ensure a minimum loading experience
    const contentTimer = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    return () => clearTimeout(contentTimer);
  }, []);

  useEffect(() => {
    // Track language changes
    const handleLanguageChanged = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    // Delay animation slightly to ensure smooth entrance
    setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    // Add particle background effect
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.particlesJS &&
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 40, density: { enable: true, value_area: 1000 } },
            color: { value: ["#ff0000", "#3498db", "#f1c40f", "#2ecc71"] },
            shape: {
              type: ["circle", "triangle", "star"],
              stroke: { width: 0, color: "#000000" },
            },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#f8e71c",
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
            },
          },
        });
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/signin");
  };

  // If loading is true, show the LoadingScreen
  if (isLoading) {
    return (
      <LoadingScreen
        onTimerComplete={handleLoadingComplete}
        initialTime={5} // Reduced loading time for better UX
      />
    );
  }

  // Show the actual Hero content when loading is complete
  return (
    <div className="relative w-full h-screen max-w-100vw overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-purple-950">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Animated background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-40 -top-40 w-96 h-96 bg-red-600 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute left-1/2 top-1/3 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-15 animate-float-slow"></div>
      </div>

      {/* Particles Background */}
      <div id="particles-js" className="absolute inset-0 z-0" />

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher key={currentLang} />
      </div>

      {/* Content Container with z-index to ensure it's above battle images */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full max-w-full px-4 sm:px-6 pt-0 pb-20 text-center">
        <div
          className={`transition-all duration-1000 ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-16"
          }`}
        >
          {/* Using a styled title instead of an image for better transparency */}
          <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-lime-300 to-green-400 mb-8 drop-shadow-[0_5px_5px_rgba(0,0,0,0.4)]">
            {t("hero.title", "Pokémon Battle Game")}
          </div>
        </div>

        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-bold text-white mb-10 max-w-2xl transition-all duration-1000 delay-300 neon-text ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          {t(
            "hero.description",
            "Welcome to the ultimate Pokémon battle experience! Test your knowledge and battle skills against other trainers to become the very best."
          )}
        </h2>

        <div
          className={`relative transition-all duration-1000 delay-600 ${
            isAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <div
            className={`cursor-pointer transition-transform duration-300 ${
              hoveredPokeball ? "scale-110" : "scale-100"
            }`}
            onClick={handleGetStarted}
            onMouseEnter={() => setHoveredPokeball(true)}
            onMouseLeave={() => setHoveredPokeball(false)}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-8 border-red-600 relative mx-auto overflow-hidden pokeball-button shine-effect">
              <div className="absolute top-1/2 left-0 w-full h-0 border-b-8 border-black" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-4 border-black animate-pulse-slow" />
            </div>
            <p className="text-white font-bold text-xl mt-4 neon-text">
              {t("hero.button", "Get Started")}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Pokeballs with improved animation */}
      <div
        className={`absolute top-32 left-[5%] w-12 h-12 transition-all duration-1000 delay-300 ${
          isAnimated ? "opacity-80 animate-float" : "opacity-0 -rotate-45"
        }`}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
          alt="Pokeball"
          className="w-full h-auto filter-none"
        />
      </div>

      <div
        className={`absolute top-48 right-[8%] w-10 h-10 transition-all duration-1000 delay-500 ${
          isAnimated
            ? "opacity-80 animate-float animation-delay-1000"
            : "opacity-0 rotate-45"
        }`}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png"
          alt="Great Ball"
          className="w-full h-auto filter-none"
        />
      </div>

      <div
        className={`absolute bottom-80 left-[15%] w-8 h-8 transition-all duration-1000 delay-700 ${
          isAnimated
            ? "opacity-80 animate-float animation-delay-2000"
            : "opacity-0 -rotate-45"
        }`}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png"
          alt="Ultra Ball"
          className="w-full h-auto filter-none"
        />
      </div>

      {/* Pokemon Characters with transparent backgrounds */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
        {/* Left Pokemon (Charizard) */}
        <div
          className={`absolute left-0 bottom-0 w-[38%] max-w-[380px] transform transition-all duration-1000 ${
            isAnimated
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          {/* Removed overlay divs for true transparency */}
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
            alt="Charizard"
            className="w-full h-auto object-contain pokemon-breathing"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,50,0,0.5))" }}
          />
        </div>

        {/* Battle Effect Flash in the middle - more dramatic */}
        <div
          className={`absolute left-1/2 bottom-[15%] transform -translate-x-1/2 w-32 h-32 rounded-full opacity-0 z-20 ${
            isAnimated ? "battle-flash-intense" : ""
          }`}
        />

        {/* Right Pokemon (Blastoise) */}
        <div
          className={`absolute right-0 bottom-0 w-[38%] max-w-[380px] transform transition-all duration-1000 ${
            isAnimated
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {/* Removed overlay divs for true transparency */}
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
            alt="Blastoise"
            className="w-full h-auto object-contain pokemon-breathing animation-delay-1000"
            style={{ filter: "drop-shadow(0 0 10px rgba(0,50,255,0.5))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
