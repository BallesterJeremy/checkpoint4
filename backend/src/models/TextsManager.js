/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

const categories = [
  "react",
  "javascript",
  "python",
  "elixir",
  "typescript",
  "SQL",
];

const textsSchema = Joi.object({
  title: Joi.string().max(255),
  body: Joi.string().max(50000).required(),
  categories: Joi.string().valid(...categories),
  textSection: Joi.number().required(),
});

class TextsManager extends AbstractManager {
  static table = "texts";

  // ! ---------- Ecrase le findAll d'AbstractManager ----------
  findAll() {
    return this.connection.query(
      `SELECT id, title, body, categories, textSection FROM  ${this.table}`
    );
  }
  // !  ----------_ ----------_ ----------_ ----------_ ----------

  get(texts) {
    return this.connection.query(
      `SELECT title, body, categories, textSection FROM ${TextsManager.table} `,
      [texts.title, texts.body, texts.categories, texts.textSection]
    );
  }

  insert(texts) {
    return this.connection.query(
      `INSERT INTO ${TextsManager.table} (title, body, categories, textSection) values (?, ?, ?, ?)`,
      [texts.title, texts.body, texts.categories, texts.textSection]
    );
  }

  update(texts) {
    return this.connection.query(
      `UPDATE ${TextsManager.table} SET ? WHERE id = ?`,
      [texts, texts.id]
    );
  }

  findAllTextWithFilter(filter) {
    const sqlValues = [];
    let sql = `SELECT id, title, body, categories, textSection FROM ${this.table}`;
    if (filter.categories && !filter.textSection) {
      sql += " WHERE categories= ?";
      sqlValues.push(filter.categories);
    } else if (!filter.categories && filter.textSection) {
      sql += " WHERE textSection = ? ";
      sqlValues.push(filter.textSection);
    } else {
      sql += " WHERE categories = ? AND textSection = ?";
      sqlValues.push(filter.categories, filter.textSection);
    }

    return this.connection.query(sql, sqlValues);
  }

  findAllBycategories(filter) {
    return this.connection.query(
      `SELECT id, title, body, categories, textSection FROM ${this.table} WHERE categories = ?`,
      [filter.categories]
    );
  }

  findAllBySection(filter) {
    return this.connection.query(
      `SELECT id, title, body, categories, textSection FROM ${this.table} WHERE textSection = ?`,
      [filter.textsSection]
    );
  }

  async validTextToCreate(texts) {
    try {
      await textsSchema.validateAsync(texts);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = TextsManager;
