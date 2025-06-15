import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import * as monaco from "monaco-editor";

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    // Extract roomId from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("roomId");

    if (!roomId) {
      console.error("Room ID is required in the URL");
      return;
    }

    // Initialize Yjs document
    const ydoc = new Y.Doc();

    // Connect to the WebSocket server
    const websocketProvider = new WebsocketProvider("ws://localhost:8080", roomId, ydoc);

    // Create a Y.Text instance for collaborative editing
    const ytext = ydoc.getText("monaco");

    // Bind Y.Text to Monaco Editor
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        language: "javascript", // Set the language to JavaScript
        theme: "vs-dark", // Use the dark theme
        automaticLayout: true, // Adjust layout automatically
      });

      editorInstanceRef.current = editor;

      // Bind Monaco Editor's model to Y.Text
      const model = editor.getModel();
      if (model) {
        // Initialize the editor with the current Y.Text content
        model.setValue(ytext.toString());

        // Observe changes in Y.Text and update the editor
        ytext.observe((event) => {
          const currentValue = model.getValue();
          const newValue = ytext.toString();
          if (currentValue !== newValue) {
            model.setValue(newValue);
          }
        });

        // Observe changes in the editor and update Y.Text
        model.onDidChangeContent(() => {
          const newValue = model.getValue();
          if (newValue !== ytext.toString()) {
            ytext.delete(0, ytext.length);
            ytext.insert(0, newValue);
          }
        });
      }
    }

    // Cleanup on component unmount
    return () => {
      websocketProvider.destroy();
      ydoc.destroy();
      editorInstanceRef.current?.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Collaborative Editor</h1>
      <div
        ref={editorRef}
        style={{ height: "80vh", width: "90%", border: "1px solid #ccc", borderRadius: "8px" }}
      ></div>
    </div>
  );
};

export default Editor;