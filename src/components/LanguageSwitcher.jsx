import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language;

  const languages = [
    { code: "en", label: "EN" },
    { code: "si", label: "සි" },
    { code: "ta", label: "த" }
  ];

  return (
    <div className="fixed bottom-1 right-4 z-50">
      <div className="flex items-center gap-1 p-1 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-lg">
        
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;

          return (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`
                px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105"
                }
              `}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}