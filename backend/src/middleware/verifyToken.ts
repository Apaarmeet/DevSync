import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
     res.sendStatus(401)
     return;
    }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
         res.sendStatus(403)
         return;
    }

     (req as any).user = user;
    next();
  });
};

export default verifyToken;