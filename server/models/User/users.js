const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  subscription: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

module.exports = model("User", userSchema);
