const express = require("express");
const router = express.Router();
const playerControllers = require("../controllers/playerControllers");

router.post("/create", playerControllers.createPlayer);
router.post("/mockUpdate", playerControllers.mockUpdate);

module.exports = router;
