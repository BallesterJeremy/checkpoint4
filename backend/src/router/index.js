const express = require("express");

const AdminsRoutes = require("./Admins.routes");
const PicturesRoutes = require("./Pictures.routes");
const TextsRoutes = require("./Texts.routes");

const router = express.Router();

router.use("/admins", AdminsRoutes);
router.use("/pictures", PicturesRoutes);
router.use("/texts", TextsRoutes);

module.exports = router;
