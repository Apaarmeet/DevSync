import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
console.log(process.env.DATABASE_URL);
import authRoutes from './routes/authRoutes'
import roomRoutes from './routes/roomRoutes'



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", roomRoutes);

mongoose.connect(process.env.DATABASE_URL as string)
.then(()=>{
    app.listen(3000,()=>{
        console.log("server is listening on port 3000");
    })
})
.catch((err)=>{
    console.log("Mongodb connection error:",err);
})