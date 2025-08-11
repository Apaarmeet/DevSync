import { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fadeb8] flex flex-col">
      {/* Top Navbar */}
      <div className="p-3">
        <h1 className="text-9xl font-extrabold text-[#1a1a1a] drop-shadow-[7px_7px_0px_rgba(0,0,0,0.3)]" >
          DevSync
        </h1>
    

      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col gap-6 items-center">
          {/* Input + Generate Button */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Room Name"
              value={roomId}
              
              className="h-11 px-3 text-lg font-bold text-slate-700 border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
            />
            <button
              className="px-4 h-11 bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] font-bold text-[#1a1a1a] transition-all hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1"
              type="button"
              onClick={() => setRoomId(generateSlug())}
            >
              Generate Room Name
            </button>
          </div>

          {/* Join Room Button */}
          <button
            className="px-5 py-2 text-2xl font-bold text-[#1a1a1a] bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[5px_5px_0px_#1a1a1a] transition-all duration-300 ease-in-out hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1"
            onClick={() => navigate(`/editor?roomId=${roomId}`)}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
