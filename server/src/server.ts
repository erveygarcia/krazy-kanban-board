const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index';
import { sequelize } from './models/index';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

//Added yo use cors
app.use(cors({
  origin: '*',
  credentials: true,
}));

//Redirect unknown routes
// This should go *after* all other routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: '../client/dist' });
});

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
