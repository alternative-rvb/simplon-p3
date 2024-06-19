const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Importing controllers
const itemControllers = require("./controllers/itemControllers");
const postsController = require("./controllers/postsControllers");
const usersControllers = require("./controllers/usersControllers");

// Routes for items
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Routes for posts
router.get("/posts", postsController.browse);
router.get("/posts/:id", postsController.read);


router.put("/posts/:id", postsController.edit);



router.post("/posts", [
    body('name').trim().isLength({ min: 1 }).withMessage('Le nom est obligatoire.'),
    body('category').trim().isLength({ min: 1 }).withMessage('La catégorie est obligatoire.'),
    body('tags').optional().isJSON().withMessage('Les tags doivent être au format JSON.'),
    body('os').optional().isJSON().withMessage('OS doit être au format JSON.'),
    body('website').optional().isURL().withMessage('Le site web doit être une URL valide.'),
    body('image').optional().isURL().withMessage('L\'image doit être une URL valide.'),
    body('date').isDate().withMessage('La date doit être valide.'),
    body('review').optional().isInt({ min: 0 }).withMessage('La revue doit être un nombre entier non négatif.'),
    body('featured').isBoolean().withMessage('Featured doit être un booléen.'),
    body('description').isLength({ min: 1 }).withMessage('La description est obligatoire.'),
    body('users_id').isInt().withMessage('ID utilisateur doit être un nombre entier.')
],
 postsController.add);


/*
Explication des méthodes utilisées :
**`body(fieldName)`** : Cible un champ spécifique du corps de la requête pour la validation.
**`trim()`** : Supprime les espaces blancs au début et à la fin du champ.
**`isLength({ min: 1 })`** : Assure que le champ a au moins une certaine longueur.
**`optional()`** : Indique que le champ n'est pas obligatoire, mais si présent, il doit respecter les validations suivantes.
**`isJSON()`** : Vérifie que le champ est un JSON valide.
**`isURL()`** : Vérifie que le champ contient une URL valide.
**`isDate()`** : Vérifie que le champ est une date valide.
**`isInt({ min: 0 })`** : Vérifie que le champ est un entier, avec une option pour spécifier un minimum.
**`isBoolean()`** : Vérifie que le champ est un booléen.
**`withMessage('message')`** : Personnalise le message d'erreur pour la règle de validation précédente.
*/
 





router.delete("/posts/:id", postsController.destroy);

// Routes for users

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.post("/users", usersControllers.add);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
