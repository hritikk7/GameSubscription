const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamControllers");

router.post("/create", teamController.createTeam);
router.get("/teams", teamController.getAllTeams);
router.get("/getTeam/:id", teamController.getTeam);
// router.get("/subscribe/:id", teamController.subscribe);

module.exports = router;
