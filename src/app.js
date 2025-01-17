
const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connect();  // Connexion à la base de données

    // TODO: Configurer les middlewares Express
    app.use(express.json());  // Middleware pour traiter les données JSON
    app.use(express.urlencoded({ extended: true }));  // Middleware pour gérer les formulaires URL encodés

    // TODO: Monter les routes
    app.use('/courses', courseRoutes);  // Ajouter les routes des cours
    app.use('/students', studentRoutes);  // Ajouter les routes des étudiants

    // TODO: Démarrer le serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log('Received SIGTERM, closing connections gracefully...');
  await db.disconnect();  // Fermer la connexion à la base de données
  process.exit(0);
});

startServer();
