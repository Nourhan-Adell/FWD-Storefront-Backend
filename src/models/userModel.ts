import connection from '../database';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  firstName: string;
  secondName: string;
  userPassword: string;
};

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export class userModel {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * from users;';
      const result = await connection.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Can't get users ${error}`);
    }
  }

  async show(firstName: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users where id = ($1);';
      const result = await connection.query(sql, [firstName]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't find user of first name = ${firstName}. Error: ${error}`);
    }
  }
  async create(u: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (firstName, secondName, userPassword) VALUES ($1, $2, $3) RETURNING *;';
      const hash = bcrypt.hashSync(u.userPassword + pepper, parseInt(saltRounds));
      const result = await connection.query(sql, [u.firstName, u.secondName, hash]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create user of name: ${u.firstName}. Error: ${error}`);
    }
  }
}
