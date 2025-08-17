
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
    <div>
      <select
        value={selectedLang}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <p>Current language: {selectedLang}</p>
    </div>
  );
}

export default LanguageDropdown;
