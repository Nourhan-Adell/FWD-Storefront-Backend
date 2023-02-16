import express, { Request, Response } from 'express';
import { Product, porductModel } from '../models/productModel';
import { verifyAuthToken } from '../middleware/verification';

// const secret = process.env.TOKEN_SECRET as string;
const store = new porductModel();

const index = async (req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(parseInt(req.params.id));
  res.json(product);
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
  } catch (error) {
    console.log('error', { error });

    res.status(400).json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
