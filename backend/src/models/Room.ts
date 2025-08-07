import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    createdBy: { 
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;