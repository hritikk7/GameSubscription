const Match = require("../models/Matches/matches");
const BatInning = require("../models/BatInning/BatInning");
const BallInning = require("../models/BowlInning/BowlInning");

exports.createMatch = async (req, res) => {
  ///teams in an obj with 2 prop : teamA_Id, TeamB_Id
  const { teams, totalOvers, openingTeam } = req.body;
  try {
    if (teams.length !== 2 || !totalOvers) {
      return res.status(400).json({
        message: "Fill the fields : teams, overs",
      });
    }
    const newMatch = Match({
      teams,
      totalOvers,
    });

    await newMatch.save();

    const firstBatinning = BatInning({
      teamId : openingTeam,
      matchId: newMatch._id
    });
    const firstBallinning = BallInning({
      teamId : teams.filter(item => item !== openingTeam)?.[0],
      matchId: newMatch._id
    });
    
    const secondBallinning = BallInning({
      teamId : openingTeam,
      matchId: newMatch._id
    });
    const secondBatinning = BatInning({
      teamId : teams.filter(item => item !== openingTeam)?.[0],
      matchId: newMatch._id
    });

    firstBallinning.save();
    firstBatinning.save();
    secondBallinning.save();
    secondBatinning.save();
    
    return res.status(200).json({
      message: "Succesfull",
      data: newMatch
    });
  } catch (err) {
    console.log("Error Creating, Match:", err);
    return res.status(400).json({ error: "Error Creating Match" });
  }
};

exports.updateMatch = async (req, res) => {
  const { id } = req.params;
  const { wonBy, result, totalRuns } = req.body;
  try {
    if (!wonBy || !result || !totalRuns) {
      return res.status(400).json({
        message: "Fill the fields: winner, result, totalRuns, ",
      });
    }
    const existingMatch = await Match.findById(id);
    if (!existingMatch) {
      return res.status(404).json({ error: "Match doesn't exist" });
    }

    existingMatch.wonBy = wonBy;
    existingMatch.result = result;
    existingMatch.totalRuns = totalRuns;

    // Save the updated match
    const updatedMatch = await existingMatch.save();
    return res.status(200).json({
      message: "Succesfull",
      match : updatedMatch
    });
  } catch (err) {
    console.log("Error Creating, Match:", err);
    return res.status(400).json({ error: "Error Creating Match" });
  }
};
