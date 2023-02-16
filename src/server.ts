import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import productRoutes from './handlers/productHandler';
import userRoutes from './handlers/userHandler';
import orderRoutes from './handlers/orderHandler';

const app: express.Application = express();
const address: string = 'http://localhost:7000';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Starting the main route');
  res.send(`<h2>Welcomt to our store ^_^</h2>`);
});

app.listen(process.env.port, () => {
  console.log(`Starting app on port ${process.env.port}`);
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);

export = app;
