const { Schema, model } = require("mongoose");
const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
});

module.exports = model("Players", playerSchema);
