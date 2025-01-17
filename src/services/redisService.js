// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est essentiel de :
  // - Utiliser un TTL (Time To Live) approprié pour les données mises en cache afin qu'elles expirent automatiquement après une période donnée et éviter ainsi de conserver des données obsolètes.
  // - Cacher uniquement les données qui sont fréquemment demandées ou coûteuses à récupérer depuis la base de données.
  // - Utiliser Redis pour des données simples (comme des chaînes) ou des structures adaptées, telles que les listes ou les hachages pour des données plus complexes.
  // - Lorsque les données sous-jacentes changent, invalider ou mettre à jour le cache pour garantir que le cache reste cohérent avec la base de données.
  // - Préférer les caches avec un TTL court pour les données moins critiques et des TTL plus longs pour les données plus stables.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

  // - Utiliser des noms de clés descriptifs qui indiquent clairement la nature des données (par exemple, `user:12345` pour l'utilisateur avec ID 12345).
  // - Organiser les clés avec des préfixes logiques (par exemple, `course:`, `user:`, `session:`) afin de faciliter la gestion et la recherche.
  // - S'assurer que les clés sont uniques pour éviter toute collision. Par exemple, combiner un identifiant unique avec un préfixe comme `user:12345`.
  // - Utiliser un TTL approprié pour chaque clé pour garantir que les données expirent lorsque elles ne sont plus pertinentes.
  // - Toujours vérifier si les données sont présentes dans le cache avant de faire des appels à la base de données.

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