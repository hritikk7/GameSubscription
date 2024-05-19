const { Schema, model } = require("mongoose");

const batInningSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  totalRuns: { type: Number, default: 0 },
  totalWickets: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  currentBatsmen: {
    type: String,
  },
  socre: [
    {
      type: Schema.Types.ObjectId,
      ref: "Score",
    },
  ],
});

module.exports = model("BatInning", batInningSchema);
