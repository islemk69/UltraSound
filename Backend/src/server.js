const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require("dotenv");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});
 
console.log( process.env.POSTGRES_HOST,  process.env.POSTGRES_DB,  process.env.POSTGRES_PASSWORD,  process.env.POSTGRES_HOST,  process.env.POSTGRES_USER)

pool.connect()
  .then(() => console.log('Connecté à PostgreSQL avec succès'))
  .catch((err) => {
    console.error('Erreur de connexion à PostgreSQL', err);
    process.exit(1);
  });

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Le serveur fonctionne correctement!' });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
