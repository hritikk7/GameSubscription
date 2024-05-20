const { Schema, model } = require("mongoose");

const bowlInningSchema = new Schema(
  {
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
    // isCompleted: { type: Boolean, default: false },
    // scores: [
    //   {
    //     playerId: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Players",
    //     },
    //     totalScore: { type: Number, default: 0 },
    //     status: {
    //       type: String,
    //       enum: ["Batting", "Out"],
    //       default: "Batting",
    //     },
    //     totalBalls: { type: Number, default: 0 },
    //     totalWickets: { type: Number, default: 0 },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = model("BowlInning", bowlInningSchema);
