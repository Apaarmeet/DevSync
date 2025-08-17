import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import CEditor from '@monaco-editor/react';
import { useAppSelector } from "../store/hook";

export default function Editor() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [code, setCode] = useState("// Start coding...");
  const editorRef = useRef(null);
  const socketRef = useRef<Socket | null>(null);

  const selectedLang = useAppSelector((state) => state.language.currentLanguage);

  useEffect(() => {
    if (!roomId) return;

    // Pass roomId as query param to socket.io server
    const socket = io("https://devsync-rrwf.onrender.com/", {
      query: { roomId },
    });
    socketRef.current = socket;

    socket.on("code-change", (newCode) => {
      setCode((prev) => (newCode !== prev ? newCode : prev));
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const onCodeChange = (newCode: string) => {
    setCode(newCode);
    if (socketRef.current && roomId) {
      socketRef.current.emit("code-change", { roomId, code: newCode });
    }
  };

  return (
    <div className="h-screen">
      <CEditor
        height="80vh"
        width="80vw"
        language={selectedLang}
        theme="vs-dark"
        value={code}
        onChange={(val)=>onCodeChange(val || "")}
        //@ts-ignore
        onMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  );
}