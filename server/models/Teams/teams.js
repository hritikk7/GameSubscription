const { Schema, model } = require("mongoose");

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Team", teamSchema);
