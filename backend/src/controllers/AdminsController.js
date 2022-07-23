const jwt = require("jsonwebtoken");
const models = require("../models");
const generatePassword = require("../helpers/generatePassword");

class AdminsController {
  static browse = async (req, res) => {
    try {
      const [results] = await models.admin.findAll();
      return res.status(200).json(results);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static read = (req, res) => {
    models.admin
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

  static edit = async (req, res) => {
    const { password } = req.body;
    const id = req.body.id ? req.body.id : parseInt(req.params.id, 10);

    try {
      // TODO validations (length, format...)
      const validadmin = await models.admin.validate({ id, password }, false);
      if (!validadmin) {
        return res
          .status(400)
          .send("You must provide a valid password and/or role");
      }

      // Hash password
      const hashedPassword = await models.admin.hashPassword(password);

      const [result] = await models.admin.update({
        id,
        password: hashedPassword,
      });

      if (result.affectedRows === 0) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static register = async (req, res) => {
    const { email, password } = req.body;

    try {
      // TODO validations (length, format...)
      const validadmin = await models.admin.validate({
        email,
        password,
      });
      if (!validadmin) {
        return res
          .status(400)
          .send("You must provide a valid email and password");
      }

      // Check if email already exists
      const emailAlreadyUsed = await models.admin.emailAlreadyExists(email);
      if (emailAlreadyUsed) {
        return res.status(400).send("Email already Used");
      }

      // Hash password
      const hashedPassword = await models.admin.hashPassword(password);

      const [result] = await models.admin.insert({
        email,
        password: hashedPassword,
      });
      const [[adminCreated]] = await models.admin.find(result.insertId);

      delete adminCreated.hashedPassword;

      return res.status(201).json(adminCreated);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static delete = (req, res) => {
    models.admin
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("You must provide an email and a password");
    }

    try {
      const [[admin]] = await models.admin.findByEmail(email);
      if (!admin) {
        return res.status(403).send("Invalid email or password");
      }

      if (await models.admin.verifyPassword(password, admin.password)) {
        // Create token
        const token = jwt.sign(
          { id: admin.id },
          process.env.ACCESS_JWT_SECRET,
          {
            expiresIn: process.env.ACCESS_JWT_EXPIRESIN,
          }
        );
        return res

          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json({ id: admin.id, email: admin.email });
      }

      return res.status(403).send("Invalid email or password");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static authorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
      req.adminId = decoded.id;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static clearCookie = (req, res) => {
    return res.clearCookie("accessToken").sendStatus(200);
  };

  static isSameId = (req, res, next) => {
    let { id } = req.params;

    id = parseInt(id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).send("You must provide a valid id");
    }

    if (id !== req.adminId) {
      return res.sendStatus(403);
    }

    return next();
  };

  static checkEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
      return res.sendStatus(400);
    }

    try {
      const [[admin]] = await models.admin.findByEmail(email);

      if (!admin) {
        return res.sendStatus(400);
      }

      delete admin.password;
      req.admin = admin;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static createTemporaryPassword = async (req, res, next) => {
    const temporaryPassword = generatePassword();
    try {
      const temporaryHashedPassword = await models.admin.hashPassword(
        temporaryPassword
      );
      await models.admin.update({
        id: req.admin.id,
        temporaryPassword: temporaryHashedPassword,
      });
      req.admin.temporaryPassword = temporaryPassword;

      const token = jwt.sign(
        { id: req.admin.id },
        process.env.RESET_PASSWORD_JWT_SECRET,
        { expiresIn: process.env.RESET_PASSWORD_JWT_EXPIRESIN }
      );

      res.cookie("resetPasswordToken", token, {
        httpOnly: true,
        secure: process.env.RESET_PASSWORD_JWT_SECURE === "true",
        maxAge: parseInt(process.env.RESET_PASSWORD_JWT_COOKIE_MAXAGE, 10),
      });
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static verifyResetPasswordToken = async (req, res, next) => {
    const token = req.cookies.resetPasswordToken;
    if (!token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
      req.id = decoded.id;
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  static verifyUser = async (req, res, next) => {
    const adminData = {
      id: req.id,
      email: req.body.email,
      password: req.body.password,
      temporaryPassword: req.body.temporaryPassword,
    };
    // eslint-disable-next-line no-restricted-syntax
    // le bug vient de admin
    try {
      const valideData = await models.admin.validateReset(adminData);
      if (!valideData) {
        console.warn(valideData);
        return res.sendStatus(400);
      }

      const [[admin]] = await models.admin.findByEmail(adminData.email);

      // check temporary password
      const valideTemporaryPassword = await models.admin.verifyPassword(
        adminData.temporaryPassword,
        admin.temporaryPassword
      );

      if (!admin || req.id !== admin.id || !valideTemporaryPassword) {
        return res.status(401).send("You are not the right user");
      }

      req.body = { id: admin.id, password: adminData.password };
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

module.exports = AdminsController;
