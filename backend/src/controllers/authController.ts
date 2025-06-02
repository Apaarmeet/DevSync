import {Request, Response} from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup = async (req:Request, res:Response): Promise<void> =>{
        try{
        const {username, email, password} = req.body;
        const existing = await User.findOne({email});
        if(existing){
           res.status(400).json({message:"user alredy exist"});
            return;
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashed
        })
        await user.save();
         const token = jwt.sign({email:user.email, user_id:user._id},process.env.JWT_SECRET as string)
         res.json({ token })
         
    } catch(err){
        console.log(err);
         res.status(500).json({message:"internal server error"})
         return;   
    }
}

export const login = async (req:Request, res:Response):Promise<void> =>{
        try{
        const {email, password} = req.body
        const user = await User.findOne({email});
        if(!user || !user.password || !( bcrypt.compare(password, user.password))){
             res.status(400).json({message:"Invalid Credentials"})
             return;
        }

        const isMatch = await bcrypt.compare(password, user.password); 
        if (!isMatch) {
         res.status(400).json({ message: "Invalid credentials" });
         return;
        }

        const token = jwt.sign({email:user.email, userId:user._id},process.env.JWT_SECRET as string)
        res.json({ token })
        return;

    } catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"})
        return;
    }
}