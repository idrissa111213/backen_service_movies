module.exports = app => {
  app.use("/api/movies", router);
};
const movies = require("../controllers/movie.controller.js");
let router = require("express").Router();

// Créer un nouveau film
router.post("/", movies.create);

// Récupérer tous les films
router.get("/", movies.findAll);

// Supprimer un film par son ID
router.delete("/:id", movies.delete);

// Supprimer tous les films
router.delete("/", movies.deleteAll);

// Récupérer tous les films enregistrés
router.get("/released", movies.findAllReleased);

// Récupérer un film avec un ID spécifique
router.get("/:id", movies.findOne);

// Mettre à jour un film avec un ID spécifique
router.put("/:id", movies.update);
