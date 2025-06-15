import { Request,Response } from "express";
import Room from "../models/Room"
import {v4 as uuid} from "uuid"

export const createRoom = async (req:Request, res:Response)=>{
    const roomId = uuid();
    const user = (req as any).user;
    console.log(user);
    const room  = new Room({
        roomId,
        createdBy: user.user_id,
        code: "",
    })

    await room.save();

    res.status(201).json({roomId});
};

export const joinRoom = async (req:Request, res:Response)=>{

    const roomId = req.query;   


    const room = await Room.findOne(roomId);
    if(!room){
         res.status(401).json({message:"room not found"});
         return;
    }

    
     res.json({ msg: "Joined room"});
     return;
}

export const saveCode = async (req:Request, res:Response)=>{
    const roomId = req.query;
    const { code } = req.body;

    const room = await Room.findOneAndUpdate(roomId, {code}, {new:true});

     if (!room) {
         res.status(404).json({ msg: "Room not found" })
            return;
        };

     res.json({ msg: "Code saved" });
     return;
}