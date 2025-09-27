import { useAppDispatch, useAppSelector } from "../store/hook";
import { setLanguage } from "../store/languageSlice";

const languages = [
  { code: "javascript", label: "JavaScript" },
  { code: "typescript", label: "TypeScript" },
  { code: "python", label: "Python" },
  { code: "java", label: "Java" },
  { code: "c", label: "C" },
  { code: "cpp", label: "C++" },
  { code: "csharp", label: "C#" },
  { code: "go", label: "Go" },
  { code: "php", label: "PHP" },
  { code: "ruby", label: "Ruby" },
  { code: "rust", label: "Rust" },
  { code: "kotlin", label: "Kotlin" },
  { code: "swift", label: "Swift" },
  { code: "scala", label: "Scala" },
  { code: "html", label: "HTML" },
  { code: "css", label: "CSS" },
  { code: "json", label: "JSON" },
  { code: "markdown", label: "Markdown" },
];

function LanguageDropdown() {
  const dispatch = useAppDispatch();
  const selectedLang = useAppSelector((state) => state.language.currentLanguage);

  return (
    <div className="space-y-3">
      <select
        value={selectedLang}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
        className="w-full px-3 py-2 text-sm font-bold text-[#1a1a1a] bg-[#fadeb8] border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a] focus:outline-none focus:ring-0 focus:border-[#1a1a1a] appearance-none cursor-pointer transition-all hover:bg-[#fff8e7]"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '16px',
          paddingRight: '32px'
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-[#fdf6e3] text-[#1a1a1a]">
            {lang.label}
          </option>
        ))}
      </select>
      
      <div className="bg-[#fadeb8] border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a] px-3 py-2">
        <p className="text-xs font-semibold text-[#1a1a1a] opacity-80">Current:</p>
        <p className="text-sm font-bold text-[#1a1a1a] capitalize">
          {languages.find(lang => lang.code === selectedLang)?.label || selectedLang}
        </p>
      </div>
    </div>
  );
}

export default LanguageDropdown;