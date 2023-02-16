import express, { Request, Response } from 'express';
import { orderModel } from '../models/orderModel';
import { verifyAuthToken } from '../middleware/verification';
const store = new orderModel();

const showOrder = async (req: Request, res: Response) => {
  try {
    const order = await store.showOrder(parseInt(req.params.userID));
    res.json(order);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Error: ${err}`);
  }
};

const showCompletedOrders = async (req: Request, res: Response) => {
  try {
    const order = await store.showCompletedOrders();
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Error: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = {
      productID: parseInt(req.body.productID),
      quantity: parseInt(req.body.quantity),
      orderStatus: req.body.orderStatus,
      userID: parseInt(req.body.userID)
    };
    const neworder = await store.create(order);
    res.json(neworder);
    res.status(200);
  } catch (err) {
    res.status(400);
    res.json(err);
    throw new Error(`Error: ${err}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:userID', verifyAuthToken, showOrder);
  app.get('/orders/complete', verifyAuthToken, showCompletedOrders);
  app.post('/orders', verifyAuthToken, create);
};

export default orderRoutes;
