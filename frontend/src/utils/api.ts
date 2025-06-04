 import axios from "axios";

export async function getRooms(token: string): Promise<string[]> {
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

export async function createRoom(token: string){
    try{
        const response = await axios.post("http://localhost:3000/api/v1/create" , {},{
             headers:{
                Authorization: token,
            },
        });
        return response.data.roomId;
    } catch (error) {
    console.error("Failed to create room:", error);
    throw new Error("Failed to create room");
  }
} 

export async function joinRoom(token: string, roomId: string){
    try{
        const response = await axios.post(`http://localhost:3000/api/v1/join:${roomId}`, {},{
             headers:{
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
    console.error("Failed to join room:", error);
    throw new Error("Failed to join room");
  }
} 