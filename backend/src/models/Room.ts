import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: { type: String, required: true }, // Unique identifier for the room
    code: { type: String, default: "" }, // Optional initial code or content
    createdBy: { 
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }, // Creator of the room

    ydocState: { type: Buffer, }, // Serialized Y.Doc state
});

const Room = mongoose.model('Room', roomSchema);

export default Room;