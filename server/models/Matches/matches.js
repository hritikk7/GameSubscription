const { Schema, model } = require("mongoose");
const matchSchema = new Schema(
  {
    wonBy: {
      type: String,
    },
    result: {
      type: String,
      enum: ["Win", "Lose", "Draw"],
      default: "Draw",
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    totalRuns: { type: Number, default: 0 },
    totalOvers : {type : Number, default: 1}
  },
  { timestamps: true }
);

module.exports = model("Match", matchSchema);
