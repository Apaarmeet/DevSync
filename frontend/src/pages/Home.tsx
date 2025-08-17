import { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fadeb8] flex flex-col">
      {/* Logo + Tagline */}
      <div className="flex flex-col justify-center items-center pt-20 sm:pt-28 lg:pt-44 text-center px-4">
        <h1
          className="text-5xl sm:text-7xl lg:text-9xl font-extrabold text-[#1a1a1a] drop-shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"
        >
          DevSync
        </h1>

        <p
          className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl font-semibold text-[#1a1a1a] italic bg-[#fdf6e3] px-3 py-1 border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] inline-block"
        >
          "Code together, in real-time — right from your browser!"
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center mt-8 sm:mt-12 lg:-mt-72 px-4">
        <div className="flex flex-col gap-4 sm:gap-6 items-center w-full max-w-lg">
          {/* Input + Generate Button */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              placeholder="Click On Generate Room Name"
              value={roomId}
              className="h-11 px-3 text-base sm:text-lg font-bold text-slate-700 border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] focus:outline-none focus:border-[#1a1a1a] flex-1"
            />
            <button
              className="w-full sm:w-auto px-4 h-11 bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[3px_3px_0px_#1a1a1a] font-bold text-[#1a1a1a] transition-all hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1 text-base sm:text-lg"
              type="button"
              onClick={() => setRoomId(generateSlug())}
            >
              Generate Room
            </button>
          </div>

          {/* Join Room Button */}
          <button
            className="w-full sm:w-auto px-5 py-2 text-lg sm:text-xl lg:text-2xl font-bold text-[#1a1a1a] bg-[#fdf6e3] border-2 border-[#1a1a1a] rounded-lg shadow-[5px_5px_0px_#1a1a1a] transition-all duration-300 ease-in-out hover:bg-[#fff8e7] active:bg-[#fcecc0] active:shadow-none active:translate-y-1"
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
