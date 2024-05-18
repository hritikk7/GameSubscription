const Team = require("../models/Teams");

//create Teams : POST

exports.createTeam = async (req, res) => {
  const { name, players } = req.body;

  try {
    if (!name || !players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }
    const existingTeam = await User.findOne({ name });
    if (existingTeam) {
      return res.status(400).json({
        message: "Team already exists",
      });
    }
    const newTeam = new Team({
      name,
      players,
    });
    await newTeam.save();
    return res.status(200).json({
      message: "Team created successfully",
      team: newTeam,
    });
  } catch (err) {
    console.log("Error Creating, team:", err);
    return res.status(400).json({ error: "Error regestring Team" });
  }
};
//Get ALL teams : GET
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    return res.status(200).json({
      message: "Successfully retrieved all teams",
      teams,
    });
  } catch (err) {
    console.log("Error getting all team:", err);
    return res.status(400).json({ error: "Error getting all Team" });
  }
};

//Get Team by ID: GET:ID
exports.getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingTeam = await Team.findById({ id });
    if (!existingTeam) {
      return res.status(404).json({ error: "Team dosent exist" });
    }
    return res.status(200).json({
      message: "Successfully retrieved team",
      team: existingTeam,
    });
  } catch (err) {
    console.log("Error getting  team:", err);
    return res.status(400).json({ error: "Error getting  Team" });
  }
};
//upadateTeam : put/teams/:id

// exports.updateTeam = async (req, res) =>{
//   const {id} = req.params
//   const {name, player, matches} = req.body
//   try {
//     const existingTeam = await Team.findById({ id });
//     if (!existingTeam) {
//       return res.status(404).json({ error: "Team dosent exist" });
//     }
//     return res.status(200).json({
//       message: "Successfully retrieved team",
//       team: existingTeam,
//     });
//   } catch (err) {
//     console.log("Error getting  team:", err);
//     return res.status(400).json({ error: "Error getting  Team" });
//   }
// }

//subscribe to teams: post: teams/subscribe
