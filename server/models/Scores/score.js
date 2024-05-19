const { Schema, model } = require("mongoose");

const score = new Schema({
  playerId: {
    type: Schema.Types.ObjectId,
    ref: "Players",
  },
  totalScore: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Batting", "Out"],
    default: "Batting",
  },
  totalBalls: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
});

module.exports = model("Score", score);
