import { Pool } from 'pg';
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, NODE_ENV, POSTGRES_TEST_DB } = process.env;

const databases: any = { dev: POSTGRES_DB, test: POSTGRES_TEST_DB };
const pool = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV ? databases[NODE_ENV] : 'dev',
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
});

export default pool;
