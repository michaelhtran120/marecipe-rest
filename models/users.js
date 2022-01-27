const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("Users", userSchema);
