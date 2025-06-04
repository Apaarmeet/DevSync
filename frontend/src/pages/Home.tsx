// pages/Home.tsx or components/Home.tsx
import React, { useEffect, useState } from "react";
import { createRoom, joinRoom } from "../utils/api";
import { getRooms } from "../utils/api";

 const Home = () => {
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  
  const token = localStorage.getItem("token")||"";
  const handleCreateRoom = async () => {
      try {
        const newRoomId = await createRoom(token);
        setRoomIds((prevRoomIds) => [...prevRoomIds, newRoomId]); // Add the new room to the list
      } catch (err) {
        console.error("Error creating room:", err);
      }
    };
  const handleJoinRoom = async (roomId: string) => {
      try {
         await joinRoom(token,roomId);
      } catch (err) {
        console.error("Error creating room:", err);
      }
    };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token") || ""; // Adjust storage as needed
        const ids = await getRooms(token);
        setRoomIds(ids);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  

  if (loading) return <div className="text-center p-4">Loading rooms...</div>;

  return (
    <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {roomIds.map((roomId) => (
        <RoomCard key={roomId} roomId={roomId} onJoinRoom={handleJoinRoom} />
      ))}
    </div>
    <button onClick={handleCreateRoom} type="button" className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Create</button>

    </div>
  );
};
interface RoomCardProps {
  roomId: string;
}

  const RoomCard: React.FC<RoomCardProps> = ({ roomId, onJoinRoom }) => {
  return (
    <div>
    <div className="p-4 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">Room ID</h3>
      <p className="text-gray-700 break-all">{roomId}</p>
    </div>
   <div>
        <button
          onClick={() => onJoinRoom(roomId)} // Pass the specific roomId to the onJoinRoom function
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Home