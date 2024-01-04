const express = require("express");
const router = express.Router();

const formController = require("../controllers/form-controller");
router.post(
  "/send-form-consultation", formController.sendForm
);

module.exports = router;
