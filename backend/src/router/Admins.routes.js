const express = require("express");

const { AdminsController } = require("../controllers");

const router = express.Router();

router.get("/", AdminsController.browse);
router.get(
  "/logout",
  AdminsController.authorization,
  AdminsController.clearCookie
);
router.get("/:id", AdminsController.read);

router.post("/login", AdminsController.login);
router.post("/", AdminsController.register);

router.put(
  "/:id",
  AdminsController.edit,
  AdminsController.authorization,
  AdminsController.isSameId
);
router.delete("/:id", AdminsController.delete);

module.exports = router;
