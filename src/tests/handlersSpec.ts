import request from 'supertest';
import app from '../server';
import userRoutes from '../handlers/userHandler';
import productRoutes from '../handlers/productHandler';
import orderRoutes from '../handlers/orderHandler';
import { User } from '../models/userModel';
import { Product } from '../models/productModel';
import { Order } from '../models/orderModel';

userRoutes(app);
describe('Testing all handlers', () => {
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

  describe('Test User model', () => {
    it('Should create new users', async () => {
      const res = await request(app).post('/users').send(user);
      expect(res.status).toBe(200);
      token += res.body;
      // console.log(token);
    });

    it('Should return all users', async () => {
      const res = await request(app).get('/products').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });

  describe('Test Product model', () => {
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
  });

  describe('Test Order module', () => {
    it('Should return orders by user ID', async () => {
      const res = await request(app)
        .get('/orders/' + order.userID)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
