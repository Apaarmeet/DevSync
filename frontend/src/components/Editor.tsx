import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createSocket } from "../socket";
import CEditor from '@monaco-editor/react';
import { useAppSelector } from "../store/hook";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [code, setCode] = useState("// Welcome to DevSync! Start coding together...\n// Your code will be synchronized in real-time with other users.");
  const socketRef = useRef<any>(null);
  const selectedLang = useAppSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_SOCKET);  
    if (!roomId) return;
    const socket = createSocket(roomId);
    socketRef.current = socket;
    
    socket.on("code-change", (newCode) => {
      setCode((prev) => (newCode !== prev ? newCode : prev));
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  const onCodeChange = (newCode: string) => {
    setCode(newCode);
    if(socketRef.current && roomId){
      socketRef.current.emit("code-change", { roomId, code: newCode });
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Container */}
      <div className="flex-1 relative">
        <CEditor
          height="80vh"
          width="80vw"
          language={selectedLang}
          theme="vs-dark"
          value={code}
          onChange={(val) => onCodeChange(val || "")}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            minimap: {
              enabled: true,
              scale: 1
            },
            padding: {
              top: 16,
              bottom: 16
            },
            bracketPairColorization: {
              enabled: true
            },
            wordWrap: 'on',
            automaticLayout: true,
            contextmenu: true,
            copyWithSyntaxHighlighting: true,
            cursorBlinking: 'smooth',
            smoothScrolling: true
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fadeb8] mx-auto mb-4"></div>
                <p className="text-sm font-semibold">Loading Monaco Editor...</p>
              </div>
            </div>
          }
        />
        
        {/* Connection Status Indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 bg-[#2d2d2d] text-white px-3 py-1 rounded-lg shadow-lg border border-[#404040]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold">Connected</span>
          </div>
        </div>
      </div>
      
      {/* Editor Footer */}
      <div className="bg-[#2d2d2d] text-white px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold">
            Language: {selectedLang.toUpperCase()}
          </span>
          <span className="opacity-70">
            Room: {roomId}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-70">
            Lines: {code.split('\n').length}
          </span>
          <span className="opacity-70">
            Characters: {code.length}
          </span>
        </div>
      </div>
    </div>
  );
}