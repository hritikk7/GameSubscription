const { Schema, model } = require("mongoose");

const batInningSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  currentBatsmen: [
    {
      type: Schema.Types.ObjectId,
      ref: "Players",
    },
  ],
  currentBowler: {
    type: Schema.Types.ObjectId,
    ref: "Players",
  },
  scores: [
    {
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
    },
  ],
}, { timestamps: true });

module.exports = model("BatInning", batInningSchema);
