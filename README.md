# CasaNews

## 1. Description du projet

    CasaNews est une application web permettant aux utilisateurs de consulter des actualités,
    de rechercher des articles, de créer et gérer leurs propres articles et de sauvegarder
    des articles dans leurs favoris.

    L'application est basée sur une architecture client-serveur avec un front-end en HTML,
    CSS et JavaScript Vanilla et un back-end développé avec Node.js et Express.js.

---

## 2. Technologies utilisées

    Une version du projet est déployée sur un serveur AlwaysData et est accessible en ligne :

    Application en ligne : https://js-hepl.alwaysdata.net/

    La version en ligne permet de tester directement les fonctionnalités de l'application sans avoir à installer le projet localement.

---

## 3. Technologies utilisées

   ### Frontend:
    - HTML5
    - CSS3
    - JavaScript Vanilla
    - Bootstrap 5.3.3

   ### Backend:
    - Node.js
    - Express.js

   ### Database:
    - MySQL

   ### External API:
    - News API

   ### Authentification:
    - JWT
    - bcryptjs

---

## 4. Fonctionnalités

    - Création de compte
    - Connexion et déconnexion
    - Authentification avec JWT
    - Consultation des actualités
    - Recherche d'actualités
    - Création d'articles
    - Consultation d'articles
    - Modification d'articles
    - Suppression d'articles
    - Partage d'articles
    - Gestion des articles favoris
    - Ajout et modification de notes sur les favoris
    - Gestion du profil utilisateur
    - Modification du mot de passe
    - Suppression du compte
    - Interface responsive

---

## 5. Architecture du projet

    ```text
    project/
    │
    ├── config/
    │   ├── database.js
    │   └── schema.sql
    │
    ├── controllers/
    │   ├── articlesController.js
    │   ├── favoritesController.js
    │   ├── newsController.js
    │   └── userController.js
    │
    ├── middlewares/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    │
    ├── repositories/
    │   ├── articlesRepository.js
    │   ├── favoritesRepository.js
    │   └── userRepository.js
    │
    ├── routes/
    │   ├── articles.js
    │   ├── favorites.js
    │   ├── news.js
    │   └── users.js
    │
    ├── services/
    │   ├── articlesService.js
    │   ├── favoritesService.js
    │   ├── newsService.js
    │   └── userService.js
    │
    ├── public/
    │   ├── add-article.html
    │   ├── article-details.html
    │   ├── edit-article.html
    │   ├── favorites.html
    │   ├── index.html
    │   ├── login.html
    │   ├── my-articles.html
    │   ├── profile.html
    │   ├── register.html
    │   └── shared-articles.html
    │
    ├── js/
    │   ├── add-article.js
    │   ├── api.js
    │   ├── article-details.js
    │   ├── auth.js
    │   ├── edit-article.js
    │   ├── favorites.js
    │   ├── home.js
    │   ├── my-articles.js
    │   ├── navigation.js
    │   ├── page-guard.js
    │   ├── profile.js
    │   └── shared-articles.js
    │
    ├── css/
    │   └── style.css
    │    │
    ├── server.js
    ├── README.md
    └── TESTS.md
    ```
   ### Organisation du back-end

    Le back-end est organisé en plusieurs couches afin de séparer les responsabilités :

    - **Routes** : définissent les différentes routes de l'API.
    - **Controllers** : gèrent les requêtes HTTP et les réponses.
    - **Services** : contiennent la logique métier de l'application.
    - **Repositories** : gèrent les interactions avec la base de données.
    - **Middlewares** : gèrent notamment l'authentification et la gestion des erreurs.
    - **Config** : contient la configuration de la base de données et le script de création du schéma.

   ### Organisation du front-end

    Le front-end est organisé en trois parties principales :

    - **public/** : contient les pages HTML de l'application.
    - **js/** : contient la logique JavaScript des différentes fonctionnalités.
    - **css/** : contient les styles de l'application.

    Cette organisation permet de séparer l'interface utilisateur, la logique applicative et l'API.

---

## 6. Installation

   ### Prérequis

    Pour exécuter le projet, il faut installer :

    - Node.js
    - npm
    - MySQL

   ### Installation du projet

    Cloner le dépôt GitHub :

    ```bash
    git clone [URL_DU_DEPOT_GITHUB]
    ```

    Entrer dans le dossier du projet :

    ```bash
    cd projet-seconde-session-backend-group-f
    ```

    Installer les dépendances :

    ```bash
    npm install
    ```
---

## 7. Configuration de la base de données

    Le projet utilise une base de données MySQL pour stocker les utilisateurs, les articles et les favoris.

    Le script de création de la structure de la base de données se trouve dans :

    ```text
    config/schema.sql
    ```

    Pour créer la base de données localement :

    1. Créer une base de données MySQL.
    2. Ouvrir le fichier `config/schema.sql`.
    3. Exécuter son contenu dans MySQL ou dans phpMyAdmin.
    4. Le script crée les tables nécessaires ainsi que leurs relations.

    Le script contient notamment les tables :

    - `users`
    - `articles`
    - `favorites`

    Les relations entre les tables sont également définies dans le script, notamment les clés étrangères reliant les articles et les favoris aux utilisateurs.

---

## 8. Variables d'environnement

    Le projet utilise un fichier `.env` pour stocker les informations de configuration et les données sensibles.

    Créer un fichier `.env` dans le dossier du back-end avec les variables suivantes :

    .env
    PORT=3000
    DB_HOST= xxx
    DB_USER= xxx
    DB_PASSWORD= xxx
    DB_NAME= xxx
    JWT_SECRET= xxx
    NEWS_API_KEY= xxx

    Les valeurs doivent être remplacées par les informations correspondant à l'environnement local.

---

## 9. Lancement du projet

    Lancer le serveur avec :

    ```bash
    npm start
    ```

    Une fois le serveur démarré, ouvrir l'application dans le navigateur à l'adresse indiquée par le serveur.

    Par défaut, l'application est accessible à :

    ```text
    http://localhost:3000
    ```

---

## 10. Utilisation

   ### Créer un compte
    - Ouvrir la page d'inscription ;
    - Entrer un nom, une adresse e-mail et un mot de passe ;
    - Valider le formulaire ;
    - Le compte est créé et l'utilisateur est authentifié.

   ### Se connecter
    - Ouvrir la page de connexion ;
    - Entrer les identifiants ;
    - Valider le formulaire ;
    - L'utilisateur est authentifié et peut accéder aux fonctionnalités privées.
    
   ### Gérer ses articles
    Après connexion :
    - Ouvrir la page « Mes articles » ;
    - Créer un nouvel article ;
    - Consulter les détails de l'article ;
    - Modifier l'article si nécessaire ;
    - Partager ou ne plus partager l'article ;
    - Supprimer l'article.
    
   ### Gérer les favoris
    Depuis les actualités :
    - Sélectionner une actualité ;
    - Ajouter l'article aux favoris ;
    - Ouvrir la page « Mes favoris » ;
    - Ajouter ou modifier une note ;
    - Supprimer un favori si nécessaire.
    
   ### Rechercher des actualités
    Depuis la page d'accueil :
    - Consulter les actualités disponibles ;
    - Entrer un mot-clé dans la recherche ;
    - Valider la recherche ;
    - Les actualités correspondant au mot-clé sont affichées.
    
   ### Gérer son profil
    Depuis la page de profil, l'utilisateur peut :
    - consulter ses informations personnelles ;
    - modifier son nom ;
    - modifier son adresse e-mail ;
    - modifier son mot de passe ;
    - supprimer son compte.

---

## 11. Tests

    Les tests fonctionnels manuels du projet sont documentés dans le fichier [`tests.md`](tests.md).

    Ce fichier contient les scénarios de test réalisés pour vérifier notamment :

    - l'authentification ;
    - les autorisations ;
    - les opérations CRUD ;
    - la gestion des articles ;
    - la gestion des favoris ;
    - la gestion du profil utilisateur ;
    - la récupération des actualités ;
    - les opérations sur la base de données.