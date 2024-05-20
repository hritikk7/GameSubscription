const Players = require("../models/Players/players");
const Team = require("../models/Teams/teams");

//io instance controller
const { getSocketIoInstance } = require("../controllers/socketController");

const convertToSnakeCase = (str) => {
  return str.toLowerCase().replace(/\s+/g, '_');
};

exports.createPlayer = async (req, res) => {
  const { name, role, teamId } = req.body;

  try {
    if (!name || !role || !teamId) {
      return res.status(400).json({
        message: "Fill the fields : Name, Role, Team",
      });
    }

    let smallCaseName = convertToSnakeCase(name);

    const existingTeam = await Team.findById(teamId);
    if (!existingTeam) {
      return res.status(400).json({
        message: "Team does not exist",
      });
    }

    const existingPlayer = await Players.findOne({
      name: smallCaseName,
      teamId,
    });

    if (existingPlayer) {
      return res.status(400).json({
        message: "Player already exists in the team",
      });
    }

    const newPlayer = new Players({
      name: smallCaseName,
      role,
      teamId
    });

    await newPlayer.save();
    return res.status(200).json({
      message: "Player created successfully",
      player: newPlayer,
    });
  } catch (err) {
    console.log("Error creating player:", err);
    return res.status(400).json({ error: "Error registering player" });
  }
};

// dummy

const emp = [
  {
    FName: "ritik",
    LName: "kumar",
    roll: 10,
  },
];
//mock api to update player
exports.mockUpdate = async (req, res) => {
  const { data } = req.body;
  console.log("insside mock update");

  const io = getSocketIoInstance();
  let id = 1;
  const newEmpDat = {
    ...emp,
    data,
    id,
  };

  id++;

  io.to("csk").emit("playerUpdated", newEmpDat);

  return res.status(200).json({
    message: "mock msg",
    emp: newEmpDat,
  });
};
