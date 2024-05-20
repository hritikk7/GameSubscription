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
    totalOvers: { type: Number, default: 0 },
    winner: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = model("Match", matchSchema);
