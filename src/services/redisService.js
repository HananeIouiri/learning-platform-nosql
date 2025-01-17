

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
  // TODO: Implémenter une fonction générique de cache
  return new Promise((resolve, reject) => {
    // Sérialiser les données si elles sont complexes
    const value = JSON.stringify(data);
    
    // Stocker les données avec un TTL
    client.setex(key, ttl, value, (err, reply) => {
      if (err) {
        return reject(err);
      }
      resolve(reply);
    });
  });
}


module.exports = {
  // TODO: Exporter les fonctions utilitaires
};