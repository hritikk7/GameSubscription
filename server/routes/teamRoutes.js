const express = require("express");
const router = express.Router();
const teamController = require("../routes/teamRoutes");

router.post("/create", teamController.createTeam);
router.get("/teams", teamController.getAllTeams);
router.get("/teams:id", teamController.getTeamById);
router.put("/teams/:id", teamController.updateTeam);

module.exports = router;
