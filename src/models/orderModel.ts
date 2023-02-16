import connection from '../database';

export type Order = {
  id?: number;
  productID: number;
  quantity: number;
  orderStatus: string;
  userID: number;
};

export class orderModel {
  async showAll(): Promise<Order[]> {
    try {
      const sql = 'SELECT * from orders';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get orders ${error}`);
    }
  }

  async showOrder(userID: number): Promise<Order> {
    try {
      const sql = 'SELECT id, quatity, orderStatus FROM orders where "userID" = $1;';
      const result = await connection.query(sql, [userID]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find order of userID = ${userID}. Error: ${error}`);
    }
  }

  async showCompletedOrders(): Promise<Order> {
    try {
      const sql = `SELECT id, quatity, orderStatus FROM orders WHERE orderStatus = 'complete';`;
      console.log('sql', sql);
      const result = await connection.query(sql);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't retun the completed orders. Error: ${error}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (productID, quatity, orderStatus, userID) VALUES ($1, $2, $3, $4) RETURNING *;`;
      const result = await connection.query(sql, [o.productID, o.quantity, o.orderStatus, o.userID]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create orders by user ${o.userID}. Error: ${error}`);
    }
  }
}
