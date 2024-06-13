# Deploiement de l'application Backend / Frontend avec Render

###### `ExpressJS` `ReactJS` `Render` `AlwaysData` `PhpMyAdmin` `CI/CD`

_Render deployment guide_

## Pré-requis

Le présent tutoriel peut s'appliquer au projet
<https://github.com/AdrienSergent/js-template-project>,
Il faudra toutefois adapter les instructions ci-dessous en fonction des spécificités de votre projet.

Pour les instructions qui vont suivrent, vous aurez besoin:

- un compte sur [GitHub](https://github.com)
- un compte sur [alwaysdata](https://www.alwaysdata.com/fr/)
- un compte sur [Render](https://render.com), vous pourrez l'utiliser avec vos identifiants [GitHub](https://github.com)

> ☝🏼 Lors des opérations de déploiement sur Render, on choisira à chaque fois la branche principale `main`.

## Héberger la base de données sur alwaysdata

1. Rendez-vous dans l'espace [MySQL](https://admin.alwaysdata.com/database/?type=mysql) de alwaysdata
2. Ajouter une nouvelle base de données et associer un utilisateur avec tous les privilèges
3. Dans le dossier `backend`, modifier le fichier `.env` avec les informations de connexion a la base de données .

A ce stade vous serez en mesure de lancer le backend et le frontend en local pour tester les opérations de CRUD.

Pensez à lancer la commande `node migrate.js` pour initialiser la base de données

## Déployer le backend avec Render

Choisir `+ New` >  `Web Service`

1. Choisir le repo GitHub à connecter
2. Nommer le service
    Par exemple: "simplon-p3-api"
    Le nom impactera l'URL de l'API
3. Pour **Root Directory**: taper "./backend"
4. Pour **Build Command**: taper `npm install`
5. Pour **Start Command**: taper `npm run start`
6. Dans **Environment Variables**: entrer les variables d'environnement de `.backend/.env`

Vous pouvez laisser les autres champs avec les valeurs par défaut.

> ☝🏼 Il faudra revenir plus tard renseigner l'URL du frontend

Une fois l'opération réussite, vérifier que vous accéder bien au données json de l'API

## Déployer le frontend avec Render

Choisir `+ New` >  `Static Site`

1. Choisir le repo GitHub à connecter
2. Nommer le site
    Par exemple: "simplon-p3"
3. Pour **Root Directory**: taper "./frontend"
4. Pour **Build Command**: taper `npm install && npm run build`
5. Pour **Publish Directory**: taper `dist` (ou `build` selon votre architecture)
6. Dans **Environment Variables**: entrer les variables d'environnement de `.frontend/.env`

> ☝🏼 Il faudra peut-être lier les variables d'environnement a un groupe

Et voilà ! Une fois l'opération terminée, vérifier que vous accéder bien à l'adresse de votre site

A partir de maintenant, lorsque vous pousserez vos commit à partir de la branche principale `main`, le site sera automatiquement mis à jour.

Pensez aussi a documenter le deploiement de votre projet à votre tour.

Bonne utilisation 😄
