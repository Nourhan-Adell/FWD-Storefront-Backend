import { Product, porductModel } from '../models/productModel';
import { User, userModel } from '../models/userModel';
import { Order, orderModel } from '../models/orderModel';

const storeProduct = new porductModel();
const storeUser = new userModel();
const storeOrder = new orderModel();

describe('Testing all model methods', () => {
  const user: User = {
    id: 5,
    firstName: 'Adel',
    secondName: 'Mohamed',
    userPassword: 'AdelMohamed'
  };

  const product: Product = {
    id: 1,
    name: 'product_1',
    price: 50
  };
  const order: Order = {
    productID: 1,
    quantity: 2,
    orderStatus: 'complete',
    userID: 1
  };

  describe('Test product model methods', () => {
    it('Fetch all products', async function () {
      await storeProduct.create(product);
      const products = await storeProduct.index();
      expect(products.length).toBeGreaterThan(0);
    });

    it('Show certain product', async function () {
      const showProduct = await storeProduct.show(product.id || 1);
      expect(showProduct.id === product.id).toBeTruthy();
    });
  });

  describe('Test user model methods', () => {
    it('Fetch all users', async function () {
      await storeUser.create(user);
      const users = await storeUser.index();
      expect(users.length).toBeGreaterThan(0);
    });

    it('show user details', async function () {
      await storeUser.create(user);
      const users = await storeUser.show('Adel');
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('Test order model methods', () => {
    it('show oder details', async function () {
      await storeUser.create(user);
      const users = await storeUser.show('Adel');
      expect(users.length).toBeGreaterThan(0);
    });
  });

  it("show completed orders' details", async function () {
    await storeUser.create(user);
    const users = await storeUser.show('Adel');
    expect(users.length).toBeGreaterThan(0);
  });
});
