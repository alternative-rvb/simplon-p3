const express = require("express");
const router = express.Router();

// Importing controllers
const itemControllers = require("./controllers/itemControllers");
const postsController = require("./controllers/postsController"); // Assurez-vous que le chemin est correct

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
router.post("/posts", postsController.add);
router.delete("/posts/:id", postsController.destroy);

module.exports = router;
