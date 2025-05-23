import mongoose from "mongoose";

const roomSchema  = new mongoose.Schema({
    roomId: String,
    code : String,
    createdby: String,
})

const Room = mongoose.model('Room', roomSchema);

export default Room;