

const { ObjectId } = require('mongodb');
const db = require('../config/db'); // Connexion à la base de données
const mongoService = require('../services/mongoService'); // Service MongoDB
const redisService = require('../services/redisService'); // Service Redis

/**
 * Crée un nouveau cours dans la base de données.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
async function createCourse(req, res) {
  try {
    const { title, description, instructor } = req.body;

    // Validation des données
    if (!title || !description || !instructor) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Insertion dans MongoDB via le service
    const course = await mongoService.insertOne('courses', {
      title,
      description,
      instructor,
      createdAt: new Date(),
    });

    // Mise en cache dans Redis pour une récupération rapide
    await redisService.set(`course:${course._id}`, JSON.stringify(course));

    // Réponse de succès
    return res.status(201).json(course);
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

/**
 * Récupère les détails d'un cours par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
async function getCourse(req, res) {
  try {
    const { id } = req.params;

    // Vérification de l'ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID invalide.' });
    }

    // Vérifier dans Redis
    const cachedCourse = await redisService.get(`course:${id}`);
    if (cachedCourse) {
      return res.status(200).json(JSON.parse(cachedCourse));
    }

    // Rechercher dans MongoDB
    const course = await mongoService.findOne('courses', { _id: new ObjectId(id) });

    if (!course) {
      return res.status(404).json({ error: 'Cours introuvable.' });
    }

    // Mise en cache des détails du cours
    await redisService.set(`course:${id}`, JSON.stringify(course));

    return res.status(200).json(course);
  } catch (error) {
    console.error('Erreur lors de la récupération du cours:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
};
