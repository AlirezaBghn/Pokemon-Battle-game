import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLanguage = i18n.language.substring(0, 2);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // Language data with expanded options
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
  ];

  // Find current language data
  const current =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Standard button matching site theme */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-lime-400 text-xs sm:text-sm md:text-base font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded transition-colors duration-300 flex items-center"
        aria-label="Change language"
      >
        <span className="mr-1.5">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg
          className={`ml-1.5 w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {/* Dropdown menu matching site theme */}
      {isOpen && (
        <div className="absolute z-30 mt-1 right-0 w-36 bg-gray-800 border border-green-500 rounded shadow-lg animate-fadeIn overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 flex items-center hover:bg-gray-700 transition-colors ${
                currentLanguage === lang.code
                  ? "text-lime-400 font-bold"
                  : "text-white"
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
