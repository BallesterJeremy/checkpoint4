/* eslint-disable consistent-return */
const models = require("../models");

class TextsController {
  static browse = (req, res) => {
    const { categories, textSection } = req.query;
    const filter = {};
    if (categories) {
      filter.categories = categories;
    }
    if (textSection) {
      filter.textSection = parseInt(textSection, 10);
    }

    if (filter.categories || filter.textSection) {
      models.texts
        .findAllTextWithFilter(filter)
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      models.texts
        .findAll()
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  };

  static read = (req, res) => {
    models.texts
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

  static edit = (req, res) => {
    const texts = req.body;

    texts.id = parseInt(req.params.id, 10);
    models.texts
      .update(texts)
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

  static add = async (req, res) => {
    const texts = req.body;

    const textsIsValid = await models.texts.validTextToCreate(texts);

    if (!textsIsValid) {
      return res.status(400).send("You must provide all data to create a text");
    }

    models.texts
      .insert(texts)
      .then(([result]) => {
        return res.status(201).send({ ...texts, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        return res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.texts
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}
module.exports = TextsController;
