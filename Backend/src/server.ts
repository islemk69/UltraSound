

import express, { Request, Response } from 'express';
import sequelize from './config/database'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import morgan from "morgan"
import cookieParser from 'cookie-parser';
import cors from "cors"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['*'], // Autorise uniquement cette origine
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
  credentials: true, // Autorise les cookies ou les en-têtes d'authentification
}));
app.use(cookieParser());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    await sequelize.sync({force: true}); // Synchroniser les tables
    console.log('Les tables ont été synchronisées.');

    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
    process.exit(1);
  }
})();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Le serveur fonctionne avec TypeScript !' });
});
