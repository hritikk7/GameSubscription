const express = require("express");
const router = express.Router();
const matchControllers = require("../controllers/matchControllers");

router.post("/create", matchControllers.createMatch)
router.post("/update/:id", matchControllers.updateMatch)

module.exports = router;