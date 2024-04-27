const db = require("../models");
const Movie = db.movies; 

// Créer et enregistrer un nouveau film
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.name) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    return;
  }
  // Créer un film
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    released: req.body.released ? req.body.released : false,
  });

  // Enregistrer le film dans la base de données
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la création du film.",
      });
    });
};

// Récupérer tous les films de la base de données
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Supprimer un film avec l'ID spécifié dans la requête
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le film avec l'ID ${id}. Le film n'a peut-être pas été trouvé !`,
        });
      } else {
        res.send({
          message: "Le film a été supprimé avec succès !",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Impossible de supprimer le film avec l'ID ${id}.`,
      });
    });
};

// Supprimer tous les films de la base de données
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} films ont été supprimés avec succès !`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la suppression de tous les films.",
      });
    });
};

// Trouver tous les films enregistrés
exports.findAllReleased = (req, res) => {
  Movie.find({ released: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Trouver un film avec un ID spécifique
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Aucun film trouvé avec l'ID ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Erreur lors de la récupération du film avec l'ID ${id}` });
    });
};

// Mettre à jour un film avec l'ID spécifié dans la requête
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides !",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le film avec l'ID ${id}. Le film n'a peut-être pas été trouvé !`,
        });
      } else res.send({ message: "Le film a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la mise à jour du film avec l'ID ${id}`,
      });
    });
};