import request from 'supertest';
import app from '../server';
import userRoutes from '../handlers/userHandler';
import productRoutes from '../handlers/productHandler';
import orderRoutes from '../handlers/orderHandler';
import { User } from '../models/userModel';
import { Product } from '../models/productModel';
import { Order } from '../models/orderModel';

describe('Testing All Handlers:', () => {
  const user: User = {
    firstName: 'Adel',
    secondName: 'Mohamed',
    userPassword: 'AdelMohamed'
  };

  const product: Product = {
    name: 'product_1',
    price: 50
  };
  const order: Order = {
    productID: 1,
    quantity: 2,
    orderStatus: 'complete',
    userID: 1
  };

  let token: string = 'Bearer ';
  userRoutes(app);
  productRoutes(app);
  orderRoutes(app);

  describe('Test User handler', () => {
    it('Should create new users', async () => {
      const res = await request(app).post('/users').send(user);
      expect(res.status).toBe(200);
      token += res.body;
      // console.log(token);
    });

    it('Should return all users', async () => {
      const res = await request(app).get('/users').set('Authorization', token);
      expect(res.status).toBe(200);
    });

    it('Should return user details by id', async () => {
      const res = await request(app).get('/users/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('Test Product handler', () => {
    it('Add new product', async () => {
      const res = await request(app).post('/products').set('Authorization', token).send(product);
      // console.log('auth-token->', token);
      // console.log('res->', res);
      expect(res.status).toBe(200);
    });

    it('Should return all products', async () => {
      const res = await request(app).get('/products');
      expect(res.status).toBe(200);
    });

    it('Should return product details by id', async () => {
      const res = await request(app).get('/products/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('Test Order handler', () => {
    it('Should return orders by user ID (Show order)', async () => {
      const res = await request(app).get('/products/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
