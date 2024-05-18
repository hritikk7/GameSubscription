const { Schema, model } = require("mongoose");

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: String,
  runs: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
});
const matchSchema = new Schema({
  opponent: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  score: {
    innings1: {
      runs: {
        type: Number,
        default: 0,
      },
      wickets: {
        type: Number,
        default: 0,
      },
      overs: {
        type: Number,
        default: 0,
      },
    },
    innings2: {
      runs: {
        type: Number,
        default: 0,
      },
      wickets: {
        type: Number,
        default: 0,
      },
      overs: {
        type: Number,
        default: 0,
      },
    },
  },
  result: {
    type: String,
    enum: ["Win", "Lose", "Draw"],
    default: "Draw",
  },
});

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    players: [playerSchema],
    matches: [matchSchema],
  },
  { timestamps: true }
);

module.exports = model("Team", teamSchema);
