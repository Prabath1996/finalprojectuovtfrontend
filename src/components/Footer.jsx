import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:bg-slate-900 px-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-end">
        <LanguageSwitcher />
      </div>
    </footer>
  );
}