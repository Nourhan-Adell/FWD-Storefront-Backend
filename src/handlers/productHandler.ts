import express, { Request, Response } from 'express';
import { Product, porductModel } from '../models/productModel';
import { verifyAuthToken } from '../middleware/verification';

// const secret = process.env.TOKEN_SECRET as string;
const store = new porductModel();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Error: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Error: ${err}`);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category
  };

  try {
    const newProduct = await store.create(product);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
    throw new Error(`Error: ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
