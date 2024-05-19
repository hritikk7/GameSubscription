const { Schema, model } = require("mongoose");

const bowlInningSchema = new Schema({
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  matchId: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  isCompleted: { type: Boolean, default: false },
  totalBalls: { type: Number, default: 0 },
  currentBowl: { type: Number, default: 0 },
  lastOver: [
    {
      type: Number,
      default: 0,
    },
  ],
  isCompleted: { type: Boolean, default: false },
  socre: [
    {
      type: Schema.Types.ObjectId,
      ref: "Score",
    },
  ],
});

module.exports = model("BowlInning", bowlInningSchema);
