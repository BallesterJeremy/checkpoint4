const express = require("express");

const { TextsController } = require("../controllers");

const router = express.Router();

router.get("/", TextsController.browse);
router.get("/:id", TextsController.read);
router.post("/", TextsController.add);
router.put("/:id", TextsController.edit);
router.delete("/:id", TextsController.delete);

module.exports = router;
