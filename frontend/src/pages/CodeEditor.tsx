import Editor from "../components/Editor";
import LanguageDropdown from "../components/LanguageDropdown";


export default function CodeEditor() {
  

  return (
    <div className="h-screen flex">
     <Editor/>
     <LanguageDropdown/>
    </div>
  );
}