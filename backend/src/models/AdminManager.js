/* eslint-disable class-methods-use-this */
const Joi = require("joi");
const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");

// password must contain almost one upper case, one lower case, a number and a special character contained in [!@#$%^&*], and have 8 to 32 characters
const schemaForCreation = Joi.object({
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const schemaForUpdate = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
});
const schemaForReset = Joi.object({
  id: Joi.number().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  temporaryPassword: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .min(8)
    .max(32)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net"] },
    })
    .required(),
});

class AdminManager extends AbstractManager {
  static table = "admin";

  insert(admin) {
    if (admin) {
      return this.connection.query(
        `insert into ${AdminManager.table} (email, password) values (?, ?)`,
        [admin.email, admin.password]
      );
    }
    return this.connection.query(
      `insert into ${AdminManager.table} (email, password) values (?, ?)`,
      [admin.email, admin.password]
    );
  }

  update(admin) {
    if (admin.temporaryPassword) {
      return this.connection.query(
        `update ${AdminManager.table} set temporaryPassword = ?  where id = ?`,
        [admin.temporaryPassword, admin.id]
      );
    }
    return this.connection.query(
      `update ${AdminManager.table} set password = ?, temporaryPassword = null where id = ?`,
      [admin.password, admin.id]
    );
  }

  emailAlreadyExists(email) {
    return this.connection
      .query(`SELECT id FROM ${AdminManager.table} WHERE email=?`, [email])
      .then(([results]) => results.length);
  }

  async validate(admin, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(admin);
      } else {
        await schemaForUpdate.validateAsync(admin);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async validateReset(admin) {
    try {
      await schemaForReset.validateAsync(admin);

      return true;
    } catch (err) {
      return false;
    }
  }

  async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async verifyPassword(password, hashedPassword) {
    const passwordIsValid = await argon2.verify(hashedPassword, password);
    return passwordIsValid;
  }

  find(id) {
    return this.connection.query(
      `select id, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`select id, email from  ${this.table}`);
  }

  findByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = AdminManager;
