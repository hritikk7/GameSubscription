const Match = require("../models/Matches/matches");

exports.createMatch = async (req, res) => {
  const { teams, totalOvers } = req.body;
  try {
    if (!teams || !totalOvers) {
      return res.status(400).json({
        message: "Fill the fields : teams, overs",
      });
    }
    const newMatch = Match({
      teams,
      totalOvers,
    });
    await newMatch.save();
    return res.status(200).json({
      message: "Succesfull",
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
  } catch (err) {
    console.log("Error Creating, Match:", err);
    return res.status(400).json({ error: "Error Creating Match" });
  }
};
