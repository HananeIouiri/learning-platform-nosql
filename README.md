# Projet de fin de module NoSQL
# Learning Platform Project

## Description

Ce projet est une plateforme d'apprentissage en ligne qui utilise MongoDB, Redis, et Node.js. Le projet implique la création d'une API avec des fonctionnalités telles que la gestion des cours et des étudiants, ainsi que l'intégration d'une couche de cache avec Redis pour améliorer les performances.

## Installation et Lancement

### Prérequis

- Node.js (version 14 ou plus récente)
- MongoDB (local ou via un service cloud comme MongoDB Atlas)
- Redis (si utilisé localement)

### Étapes d'installation


1. **Création du dépôt :**
   1.1 Créer un dépôt public sur GitHub:
Étape 1 : Allez sur GitHub et connectez-vous à votre compte.
Étape 2 : Créez un nouveau dépôt en cliquant sur le bouton "New" en haut à droite.
Étape 3 : Nommez le dépôt (par exemple learning-platform-nosql), choisissez de le rendre public et ne cochez pas la case pour initialiser avec un README (puisque vous allez le faire vous-même).
Étape 4 : Cliquez sur "Create repository".

   ![image](screenshoots\image1.png)

2. **Configuration de votre environnement local :**
   ```bash
   # Clonez mon dépôt template 
   git clone https://github.com/pr-daaif/learning-platform-template
   ![image](screenshoots\image2.png)
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin

   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/HananeIouiri/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   
   ![image](screenshoots\image3.png)

3. **Installation des dépendances :**
   ```bash
   npm install
  ![image](screenshoots\image4.png)
4. **Configurer les variables d'environnement**

#Créez un fichier .env à la racine du projet et ajoutez les configurations suivantes :

MONGODB_URI=mongodb://localhost:27017/learning-platform
REDIS_HOST=localhost
REDIS_PORT=6379
Démarrer MongoDB et Redis

#Assurez-vous que MongoDB et Redis sont en cours d'exécution sur votre machine locale, ou utilisez les services cloud correspondants. Vous pouvez démarrer MongoDB avec la commande suivante :
mongod
![alt text](image.png)
#Pour Redis, assurez-vous que le serveur Redis est également démarré.

5. **Lancer le projet**

Une fois les configurations effectuées, démarrez le serveur en utilisant :
npm start
Cela démarrera l'application sur http://localhost:3000.

### Structure du projet
La structure de ce projet est organisée comme suit :

learning-platform/
│
├── src/
│   ├── config/          # Configuration de la base de données et des services
│   ├── controllers/     # Logique des routes 
│   ├── routes/          # Définition des routes API
│   ├── services/        # Logique métier (MongoDB, Redis, etc.)
│   ├── app.js           # Point d'entrée de l'application
│   └── server.js        # Démarrage du serveur
│
├── .gitignore           # Fichiers et dossiers à ignorer par Git
├── .env                 # Variables d'environnement
├── README.md            # Ce fichier
├── package.json         # Dépendances et scripts
└── package-lock.json    # Verrouillage des versions des dépendances
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code
### Choix techniques résumés
MongoDB pour la base de données : Choisi pour sa flexibilité et sa capacité à gérer des documents JSON, idéal pour une plateforme d'apprentissage où les données changent fréquemment.

Redis pour le cache : Utilisé pour améliorer les performances en stockant les données fréquemment accédées en mémoire, réduisant ainsi la charge sur MongoDB et améliorant les temps de réponse.

Node.js et Express : Node.js permet de créer un serveur API rapide et performant, tandis qu'Express simplifie la gestion des routes et des middlewares, permettant de développer une application évolutive.

Modularité avec des services séparés : L'architecture modulaire permet de séparer les fonctionnalités (MongoDB, Redis, etc.), rendant le code plus propre, évolutif et facile à tester.
### Les réponses aux questions
**// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?**
// Réponse : 
// - Meilleure modularité et séparation des responsabilités (Single Responsibility Principle).
// - Réutilisation des connexions dans l'application.
// - Maintenance facilitée et meilleure lisibilité.

**// Question : Comment gérer proprement la fermeture des connexions ?**
// Réponse : 
// - Utiliser les méthodes de fermeture (par exemple, client.close() pour MongoDB).
// - Gérer les événements de terminaison (process.on('SIGINT')) pour libérer les ressources.

**// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
// Réponse : 
// - Assure que toutes les configurations nécessaires sont présentes et correctes.
// - Évite des erreurs imprévisibles en cours d'exécution.
// - Permet de détecter les problèmes au plus tôt, lors du démarrage.

**// Question: Que se passe-t-il si une variable requise est manquante ?**
// Réponse : 
// - L'application peut planter ou se comporter de manière incorrecte.
// - Une erreur explicite doit être levée pour guider la correction de la configuration.


**// Question: Quelle est la différence entre un contrôleur et une route ?**
// Réponse:
// - Une route gère les URL et les méthodes HTTP associées (GET, POST, etc.).
// - Un contrôleur contient la logique métier pour répondre à une requête spécifique.

**// Question : Pourquoi séparer la logique métier des routes ?**
// Réponse :
// - Simplifie le code en organisant les responsabilités.
// - Les routes restent claires et faciles à maintenir.
// - La logique métier devient réutilisable et testable.

**// Question: Pourquoi séparer les routes dans différents fichiers ?**
// Réponse : Séparer les routes permet de mieux organiser le code en fonction des différentes entités et fonctionnalités du projet.
// Chaque fichier de routes gère une partie spécifique du projet (par exemple, les cours), ce qui rend le code plus lisible, maintenable, et évolutif.

**// Question: Comment organiser les routes de manière cohérente ?**
// Réponse : Les routes sont organisées en fonction des entités principales du projet (dans ce cas, les cours). Chaque route utilise un verbe HTTP approprié pour l’action qu’elle effectue. Elles sont regroupées sous des chemins logiques comme .
const express = require('express');

**// Question: Pourquoi créer des services séparés ?**
// Réponse: 
// Créer des services séparés permet de mieux organiser le code en le rendant plus modulaire. Chaque service peut se concentrer sur une tâche spécifique (par exemple, l'accès à la base de données, la gestion des utilisateurs ou des cours). Cela permet de séparer la logique métier de la gestion technique, rendant le code plus maintenable, réutilisable et testable. Un autre avantage est la possibilité de modifier ou d'ajouter de nouvelles fonctionnalités sans perturber d'autres parties du code, et d'augmenter ainsi l'évolutivité du projet.

**Question : Comment gérer efficacement le cache avec Redis ?**
// Réponse : Pour gérer efficacement le cache avec Redis, il est essentiel de :
  // - Utiliser un TTL (Time To Live) approprié pour les données mises en cache afin qu'elles expirent automatiquement après une période donnée et éviter ainsi de conserver des données obsolètes.
  // - Cacher uniquement les données qui sont fréquemment demandées ou coûteuses à récupérer depuis la base de données.
  // - Utiliser Redis pour des données simples (comme des chaînes) ou des structures adaptées, telles que les listes ou les hachages pour des données plus complexes.
  // - Lorsque les données sous-jacentes changent, invalider ou mettre à jour le cache pour garantir que le cache reste cohérent avec la base de données.
**// Question: Quelles sont les bonnes pratiques pour les clés Redis ?**
// Réponse:
//  Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés clairs et descriptifs, qui permettent de comprendre facilement ce qu'elles représentent. Par exemple, pour les utilisateurs, utiliser un préfixe comme `user:12345` pour un utilisateur avec l'ID 12345. Utilisez également des préfixes pour organiser les clés par catégories, comme `course:` pour les cours, et assurez-vous que les clés sont uniques pour éviter toute collision. Il est aussi important d'utiliser un TTL (Time to Live) approprié pour chaque clé afin de garantir que les données expirent et ne restent pas inutilisées indéfiniment.

**// Question: Comment organiser le point d'entrée de l'application ?**
// Réponse: Le point d'entrée de l'application doit être organisé de manière claire et modulaire. 
  // Voici les étapes recommandées pour organiser le point d'entrée :
  // 1. **Initialisation des configurations** : Charger les variables d'environnement et toute configuration nécessaire 
  // 2. **Connexion à la base de données** : Initialiser la connexion à la base de données au démarrage de l'application (par exemple, avec MongoDB ou PostgreSQL).
  // 3. **Configuration des middlewares** : Appliquer les middlewares nécessaires (comme la gestion des erreurs, la sécurité, les CORS, la gestion du JSON, etc.).
  // 4. **Monter les routes** : Définir les différentes routes de l'application (par exemple, les routes des cours et des étudiants).
  // 5. **Démarrer le serveur** : Enfin, démarrer l'application Express pour commencer à écouter les requêtes entrantes.

**// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?**
// Réponse: La meilleure façon de gérer le démarrage de l'application consiste à organiser correctement l'initialisation et à suivre un processus asynchrone pour garantir que toutes les connexions et configurations nécessaires sont chargées avant de démarrer le serveur.
// - **Connexions aux bases de données** : Il est essentiel de gérer correctement les connexions aux bases de données avant de démarrer le serveur afin de s'assurer que l'application fonctionne correctement.
// - **Gestion des erreurs** : Il faut prévoir un mécanisme de gestion des erreurs pour garantir que l'application ne démarre pas si une étape cruciale échoue, comme la connexion à la base de données.



**Question : Quelles sont les informations sensibles à ne jamais committer ?**
Réponse : 
On ne doit jamais inclure dans le dépôt Git les informations confidentielles comme :
- Les identifiants et mots de passe (par exemple     pour une base de données).
- Les clés d'accès API ou les jetons (tokens).
- Les URLs ou configurations sensibles (comme MONGODB_URI ou REDIS_URI).
Cela permet de protéger notre projet contre des fuites de données ou des accès non autorisés.



**Question : Pourquoi utiliser des variables d’environnement ?**
-Réponse : Les variables d'environnement sont super pratiques, car elles permettent de :
- Garder les informations sensibles en sécurité (elles ne sont pas visibles dans le code).
- Adapter facilement le projet à différents environnements (comme le développement, les tests ou la production).
-En résumé, elles rendent le projet plus flexible et sécurisé !