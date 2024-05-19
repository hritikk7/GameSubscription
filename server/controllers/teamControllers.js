const Team = require("../models/Teams/teams");
const User = require("../models/User/users.js");
//create Teams : POST

exports.createTeam = async (req, res) => {
  const { name, players, match, result } = req.body;

  try {
    if (!name || !players || !Array.isArray(players) || players.length === 0) {
      return res.status(400).json({
        message: "Fill all the fields",
      });
    }
    const existingTeam = await Team.findOne({ name });
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
exports.getTeam = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const existingTeam = await Team.findById({ _id: id });
    if (!existingTeam) {
      return res.status(404).json({ error: "Team dosent exist" });
    }
    console.log(existingTeam);
    return res.status(200).json({
      message: "Successfully retrieved team",
      team: existingTeam,
    });
  } catch (err) {
    console.log("Error getting  team:", err);
    return res.status(400).json({ error: "Error getting  Team" });
  }
};

// upadateTeam : put/teams/:id

exports.updateTeam = async (req, res) => {
  const { id } = req.params; //team_id
  const { name, players, matches } = req.body;
  console.log("matches", id);
  try {
    const existingTeam = await Team.findById({ _id: id });
   

    if (!existingTeam) {
      return res.status(404).json({ error: "Team dosent exist" });
    }

    if (name) {
      existingTeam.name = name;
    }
    if (players) {
      existingTeam.players = players;
    }
    if (matches) {
      existingTeam.matches = matches;
    }

    const updatedTeam = await existingTeam.save();
    console.log("players", updatedTeam);

    return res.status(200).json({
      message: "Successfully updated team",
      team: updatedTeam,
    });
  } catch (err) {
    console.log("Error getting  team:", err);
    return res.status(400).json({ error: "Error getting  Team" });
  }
};

//subscribe to teams: post: teams/subscribe
exports.subscribe = async (req, res) => {
  const { user } = req.user; ///user id
  const { id } = req.params;
  try {
    const existingTeam = await Team.find({ _id: id });
    if (!existingTeam) {
      return res.status(404).json({ error: "Team dosent exist" });
    }
    const existingUser = await User.findById({ _id: user.id });
    console.log("existing uiser", existingUser);
    if (!existingUser) {
      return res.status(404).json({ error: "User dosent exist" });
    }
    if (existingUser.subscription.includes(id)) {
      return res.status(400).json({ error: "Already subscribed to the team" });
    }
    existingUser.subscription.push(id);
    await existingUser.save();

    return res.status(200).json({
      message: "Subscription Successfully",
    });
  } catch (err) {
    console.log("Error getting  team:", err);
    return res.status(400).json({ error: "Error getting  Team" });
  }
};