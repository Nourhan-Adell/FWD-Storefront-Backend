import db from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class porductModel {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM Product;';
      const result = await db.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get rows. ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM product where id = $1;';
      const result = await db.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find product of id = ${id}. Error: ${error}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *;`;
      const result = await db.query(sql, [p.name, p.price, p.category]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create product of name: ${p.name}. Error: ${error}`);
    }
  }
}
