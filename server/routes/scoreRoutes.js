const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");


router.post("/updateBall", scoreController.updatePerBall);

module.exports = router;