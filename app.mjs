import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/vmRoutes.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();
const app = express();

console.log(process.env.API_TOKEN);

app.use(authMiddleware);
app.use('/api/vm', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'execution sur le port ${PORT}`);
});