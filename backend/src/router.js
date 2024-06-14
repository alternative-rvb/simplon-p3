const express = require("express");
const { body, validationResult } = require("express-validator");
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

router.post("/posts", 
  body('name').isString().isLength({ min: 1 }).withMessage('Name is required and should be a string.'),
  body('image').isURL().withMessage('Image should be a URL.'),
  body('review').isNumeric().withMessage('Review should be a number.'),
  body('tags').isJSON().withMessage('Tags should be a json.'),
  body('os').isJSON().withMessage('OS should be a json.'),
  // Suite
 postsController.add);

router.delete("/posts/:id", postsController.destroy);

// Routes for users

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.put("/users/:id", usersControllers.edit);
router.post("/users", usersControllers.add);
router.delete("/users/:id", usersControllers.destroy);

module.exports = router;
