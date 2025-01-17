

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    const uri = config.MONGODB_URI;
    mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.MONGODB_DB_NAME);
    console.log(`MongoDB connecté à la base : ${config.MONGODB_DB_NAME}`);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    process.exit(1); // Arrêt du processus en cas d'erreur critique
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    redisClient = redis.createClient({ url: config.REDIS_URI });
    redisClient.on('error', (err) => {
      console.error('Erreur de connexion à Redis :', err);
    });
    await redisClient.connect();
    console.log('Redis connecté');
  } catch (error) {
    console.error('Erreur lors de la connexion à Redis :', error);
    process.exit(1); // Arrêt du processus en cas d'erreur critique
  }
}
// Gestion de la fermeture des connexions
function closeConnections() {
  if (mongoClient) {
    mongoClient.close();
    console.log('Connexion MongoDB fermée.');
  }
  if (redisClient) {
    redisClient.quit();
    console.log('Connexion Redis fermée.');
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  
    connectMongo,
    connectRedis,
    closeConnections,
    getDb: () => db, // Exporter la base MongoDB
    redisClient,
  
};