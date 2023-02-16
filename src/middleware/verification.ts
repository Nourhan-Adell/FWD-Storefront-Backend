import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.TOKEN_SECRET as string;

export const verifyAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    res.status(200);

    const decoded = jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400);
    res.json('Access denaid... Invalid token');
    return;
  }
};
