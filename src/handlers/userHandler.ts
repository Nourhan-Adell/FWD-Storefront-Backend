import express, { Request, Response } from 'express';
import { User, userModel } from '../models/userModel';
import { verifyAuthToken } from '../middleware/verification';
import jwt from 'jsonwebtoken';

const secret = process.env.TOKEN_SECRET as string;
const store = new userModel();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
    res.status(200);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    userPassword: req.body.userPassword
  };
  try {
    const newUser = await store.create(user);
    let token = jwt.sign({ id: newUser.id, firstName: newUser.firstName, secondName: newUser.secondName }, secret);
    res.status(200);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const authenticate = async (req: Request, res: Response) => {
//   const user: User = {
//     firstName: req.body.firstName,
//     secondName: req.body.secondName,
//     userPassword: req.body.userPassword
//   };
//   try {
//     const u = await store.authenticate(user.firstName, user.userPassword);
//     var token = jwt.sign({ user: u }, secret);
//     res.json(token);
//   } catch (error) {
//     res.status(401);
//     res.json({ error });
//   }
// };

// const logIn = async (req: Request, res: Response) => {
//   const userAuth = await store.authenticate(req.body.firstName, req.body.userPassword);
//   if (userAuth) {
//     var token = jwt.sign({ user: userAuth }, secret);
//     res.status(200);
//     res.json(token);
//   } else {
//     res.json(userAuth);
//     res.status(400);
//   }
// };

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  // app.post('/login', logIn);
};

export default userRoutes;
