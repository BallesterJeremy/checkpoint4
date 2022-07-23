/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const AbstractManager = require("./AbstractManager");

const pics = [
  "carousel",
  "react",
  "javascript",
  "python",
  "elixir",
  "typescript",
  "SQL",
];

const picturesSchema = Joi.object({
  id: Joi.number(),
  file: Joi.string().max(255),
  alt: Joi.string().max(255).required(),
  genres: Joi.string().valid(...pics),
  picSection: Joi.number(),
});

class PictureManager extends AbstractManager {
  static table = "pictures";

  find(id) {
    return this.connection.query(
      `select file, alt, genres, picSection from  ${this.table} where id = ? `,
      [id]
    );
  }

  findBySection(id) {
    return this.connection.query(
      `SELECT id, file, alt, genres, text_id, picSection from  ${this.table} where picSection = ? `,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `SELECT id, file, alt, genres, text_id, picSection FROM  ${this.table}`
    );
  }

  findAllWithFilter(filter) {
    const sqlValues = [];
    let sql = `SELECT id, file, alt, genres, picSection FROM ${this.table}`;
    if (filter.genres && !filter.picSection) {
      sql += " WHERE genres= ?";
      sqlValues.push(filter.genres);
    } else if (!filter.genres && filter.picSection) {
      sql += " WHERE picSection = ?";
      sqlValues.push(filter.picSection);
    } else {
      sql += " WHERE genres = ? AND picSection = ? ";
      sqlValues.push(filter.genres, filter.picSection);
    }
    // console.log(sql, sqlValues);
    return this.connection.query(sql, sqlValues);
  }

  get(pictures) {
    return this.connection.query(
      `SELECT file, alt, genres, picSection FROM ${this.table} `,
      [pictures.file, pictures.alt, pictures.genres, pictures.picSection]
    );
  }

  insert(pictures) {
    return this.connection.query(`INSERT INTO ${PictureManager.table} SET ?`, [
      pictures,
    ]);
  }

  update(pictures) {
    return this.connection.query(`UPDATE ${this.table} SET ? WHERE id=?`, [
      pictures,
      pictures.id,
    ]);
  }

  async validPicturesToCreate(pictures) {
    try {
      await picturesSchema.validateAsync(pictures);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = PictureManager;
