// pages/Home.tsx or components/Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

 const Home = () => {
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

   async function getRooms(token: string): Promise<string[]> {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/home", {
      headers: {
        Authorization: token,
      },
    });

    return response.data.roomIds as string[];
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    throw new Error("Failed to fetch rooms");
  }
}

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {roomIds.map((roomId) => (
        <RoomCard key={roomId} roomId={roomId} />
      ))}
    </div>
  );
};
interface RoomCardProps {
  roomId: string;
}

  const RoomCard: React.FC<RoomCardProps> = ({ roomId }) => {
  return (
    <div className="p-4 rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">Room ID</h3>
      <p className="text-gray-700 break-all">{roomId}</p>
    </div>
  );
};

export default Home