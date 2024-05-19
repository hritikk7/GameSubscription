const Players = require("../models/Players/players");
const Team = require("../models/Teams/teams");

function convertToSnakeCase(input) {
  // Convert the string to lowercase
  let lowercaseString = input.toLowerCase();

  // Replace spaces with underscores
  let snakeCaseString = lowercaseString.replace(/\s+/g, "_");

  return snakeCaseString;
}

exports.createPlayer = async (req, res) => {
  const { name, role, team } = req.body;

  try {
    if (!name || !role || !team) {
      return res.status(400).json({
        message: "Fill the fields : Name, Role, Team",
      });
    }
    let smallCaseName = convertToSnakeCase(name);
    let smallCaseteam = convertToSnakeCase(team);
    const existingTeam = await Team.findOne({ name: smallCaseteam });
    if (!existingTeam) {
      return res.status(400).json({
        message: "Team does not exists",
      });
    }
    const existingPlayer = await Players.findOne({
      smallCaseName,
      smallCaseteam,
    });
    if (existingPlayer) {
      return res.status(400).json({
        message: "Player already  exists in the team",
      });
    }
    const newPlayer = new Players({
      smallCaseName,
      role,
      smallCaseteam,
    });
    
    await newPlayer.save();
    return res.status(200).json({
      message: "Player created successfully",
      player: newPlayer,
    });
  } catch (err) {
    console.log("Error Creating, team:", err);
    return res.status(400).json({ error: "Error regestring Team" });
  }
};
