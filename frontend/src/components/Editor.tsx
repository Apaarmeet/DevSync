import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import CEditor from '@monaco-editor/react';

export default function Editor() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [code, setCode] = useState("// Start coding...");
  const editorRef = useRef(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Pass roomId as query param to socket.io server
    const socket = io("http://localhost:3001", {
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
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(val)=>onCodeChange(val || "")}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </div>
  );
}