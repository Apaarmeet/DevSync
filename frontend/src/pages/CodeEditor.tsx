import Editor from "../components/Editor";
import LanguageDropdown from "../components/LanguageDropdown";
import { useSearchParams } from "react-router-dom";
import { Copy, Users, Settings } from "lucide-react";
import { useState } from "react";

export default function CodeEditor() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [copied, setCopied] = useState(false);

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fadeb8] flex flex-col">
      {/* Header */}
      <header className="bg-[#fdf6e3] border-b-4 border-[#1a1a1a] shadow-[0_4px_0px_#1a1a1a] px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
              DevSync
            </h1>
            <div className="hidden sm:block w-1 h-8 bg-[#1a1a1a]"></div>
            <span className="hidden sm:inline text-lg font-semibold text-[#1a1a1a] italic">
              Live Collaboration
            </span>
          </div>

          {/* Room Info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#fadeb8] px-3 py-2 border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a]">
              <Users className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-sm font-bold text-[#1a1a1a]">
                Room: {roomId?.substring(0, 8)}...
              </span>
              <button
                onClick={copyRoomId}
                className="p-1 hover:bg-[#fff8e7] rounded transition-colors"
                title="Copy Room ID"
              >
                <Copy className="w-3 h-3 text-[#1a1a1a]" />
              </button>
            </div>
            {copied && (
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded border border-green-300">
                Copied!
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Editor Section */}
        <div className="flex-1 bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[5px_5px_0px_#1a1a1a] overflow-hidden">
          <div className="bg-[#1a1a1a] text-[#fdf6e3] px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 font-semibold">Code Editor</span>
          </div>
          <Editor />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Language Selection */}
          <div className="bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-[#1a1a1a]" />
              <h3 className="text-lg font-bold text-[#1a1a1a]">Language</h3>
            </div>
            <LanguageDropdown />
          </div>

          {/* Room Stats */}
          <div className="bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#1a1a1a]" />
              <h3 className="text-lg font-bold text-[#1a1a1a]">Collaboration</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a1a1a]">Connected:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold border border-green-300">
                  1 User
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a1a1a]">Status:</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold border border-blue-300">
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] p-4">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 text-sm font-bold text-[#1a1a1a] bg-[#fadeb8] border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a] transition-all hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1">
                Save Code
              </button>
              <button className="w-full px-3 py-2 text-sm font-bold text-[#1a1a1a] bg-[#fadeb8] border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a] transition-all hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1">
                Download
              </button>
              <button 
                onClick={copyRoomId}
                className="w-full px-3 py-2 text-sm font-bold text-[#1a1a1a] bg-[#fadeb8] border-2 border-[#1a1a1a] rounded-lg shadow-[2px_2px_0px_#1a1a1a] transition-all hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1"
              >
                Share Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}