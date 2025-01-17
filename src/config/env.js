

const dotenv = require('dotenv');
dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Les variables d'environnement suivantes sont manquantes : ${missingVars.join(', ')}`);
    throw new Error('Configuration invalide. Veuillez vérifier votre fichier .env.');
  }

  console.log('Toutes les variables d’environnement requises sont présentes.');
}

// Exécuter la validation des variables au démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};
