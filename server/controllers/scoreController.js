const BatInning = require("../models/BatInning/BatInning");
const BowlInning = require("../models/BowlInning/BowlInning");
const Score = require("../models/Scores/score");
const { getSocketIoInstance } = require("../controllers/socketController");

//req: teamId, matchId, runsScored, wicket, isCompleted, currentBatsman, currentBowler,
// score[playerId, totalScore, status, totalBalls, totalWickets balltype]

exports.updatePerBall = async (req, res) => {
  const {
    matchId,
    teamId, // batting team
    ballType,
    runsScored,
    isWicket,
    strikerId,
    nonStrikerId,
    bowlerId,
  } = req.body;

  try {
    // Find the batting inning for the given match and team
    const battingInning = await BatInning.findOne({
      matchId,
      teamId,
    });

    // If batting inning not found, return 404 error
    if (!battingInning) {
      return res.status(404).json({ error: "Batting inning not found" });
    }
    // Find the bowling inning for the given match and opponent team
    const bowlingInning = await BowlInning.findOne({
      matchId,
      teamId: { $ne: teamId }, // Find the bowling team (not the batting team)
    });

    // If bowling inning not found, return 404 error
    if (!bowlingInning) {
      return res.status(404).json({ error: "Bowling inning not found" });
    }

    // Increment bowler's total balls
    bowlingInning.totalBalls += 1;

    // Handle legal balls
    if (ballType === "legal") {
      // Find or create the striker's score record
      let strikerScore = battingInning.scores.find(
        (score) => score.playerId.toString() === strikerId
      );
      if (!strikerScore) {
        strikerScore = new Score({ playerId: strikerId });
        battingInning.scores.push(strikerScore);
      }

      if (
        battingInning.currentBatsmen.length === 0 ||
        battingInning.currentBatsmen.length === 2
      ) {
        battingInning.currentBatsmen = [strikerId, nonStrikerId];
      }

      // If it's a new over or the first ball of the over, update the current bowler
      if (battingInning.currentBowler !== bowlerId) {
        battingInning.currentBowler = bowlerId;
      }
      // Ensure bowlingInning.lastOver is initialized as an array
      if (!bowlingInning.lastOver) {
        bowlingInning.lastOver = [];
      }

      // Push the runs scored to the lastOver array
      bowlingInning.lastOver.push(runsScored);

      // Ensure lastOver array has a maximum length of 6
      if (bowlingInning.lastOver.length > 6) {
        // Remove the first elements until the length is 6
        bowlingInning.lastOver = bowlingInning.lastOver.slice(-6);
      }

      // Update striker's status and score if it's a wicket
      if (isWicket) {
        strikerScore.status = "Out";
        battingInning.totalWickets += 1;
      } else {
        // Update the total runs and striker's individual score
        battingInning.totalRuns += runsScored;
        strikerScore.totalScore += runsScored;
        strikerScore.totalBalls += 1;
      }
    }

    // Handle wide balls
    if (ballType === "wide") {
      // Increment total runs for wide ball
      battingInning.totalRuns += 1;
    }

    // Increment bowler's total wickets if it's a wicket
    if (isWicket) {
      bowlingInning.totalWickets += 1;
    }

    // Save the updated innings
    await battingInning.save();
    await bowlingInning.save();

    const io = getSocketIoInstance();
    io.to(teamId).emit("matchUpdated", { battingInning, bowlingInning });

    return res.status(200).json({
      message: "Ball updated successfully",
      battingInning,
      bowlingInning,
    });
  } catch (err) {
    console.log("Error updating ball:", err);
    return res.status(400).json({ error: "Error updating ball" });
  }
};
