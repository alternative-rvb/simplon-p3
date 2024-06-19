const { validationResult } = require("express-validator");
const models = require("../models");

const browse = (req, res) => {
  models.post
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.post
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = req.body;
  post.id = parseInt(req.params.id, 10);

  models.post
    .update(post)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  // invalide la requête si les conditions ne sont pas remplies dans router.js
  const errors = validationResult(req);

  console.log('errors:', errors)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const post = req.body;
  console.log('post:', post);

  models.post
    .insert(post)
    .then(([result]) => {
      res.status(201).json({
        message: 'Created',
        postId: result.insertId,
        post: {
          id: result.insertId,
          ...post,
        }
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const destroy = (req, res) => {
  models.post
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
