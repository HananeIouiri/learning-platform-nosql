// services/databaseService.js
const { ObjectId } = require('mongodb');
const db = require('../db');  // Assurez-vous que db.js est bien configuré pour interagir avec MongoDB

// Question: Pourquoi créer des services séparés ?
// Réponse: 
// Créer des services séparés permet de mieux organiser le code en le rendant plus modulaire. Chaque service peut se concentrer sur une tâche spécifique (par exemple, l'accès à la base de données, la gestion des utilisateurs ou des cours). Cela permet de séparer la logique métier de la gestion technique, rendant le code plus maintenable, réutilisable et testable. Un autre avantage est la possibilité de modifier ou d'ajouter de nouvelles fonctionnalités sans perturber d'autres parties du code, et d'augmenter ainsi l'évolutivité du projet.

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
    const result = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    if (!result) {
      throw new Error(`Document avec l'ID ${id} non trouvé dans la collection ${collection}`);
    }
    return result;
  } catch (error) {
    throw new Error(`Erreur lors de la recherche de l'ID ${id}: ${error.message}`);
  }
}

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse:
//  Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés clairs et descriptifs, qui permettent de comprendre facilement ce qu'elles représentent. Par exemple, pour les utilisateurs, utiliser un préfixe comme `user:12345` pour un utilisateur avec l'ID 12345. Utilisez également des préfixes pour organiser les clés par catégories, comme `course:` pour les cours, et assurez-vous que les clés sont uniques pour éviter toute collision. Il est aussi important d'utiliser un TTL (Time to Live) approprié pour chaque clé afin de garantir que les données expirent et ne restent pas inutilisées indéfiniment.

// Export des services
module.exports = {
  findOneById,  // Export de la fonction générique findOneById pour l'utiliser ailleurs dans l'application
};
