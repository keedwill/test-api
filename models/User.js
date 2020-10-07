const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
