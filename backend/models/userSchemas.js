const uuid = require("uuid");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//collection for primaryDataSchema
let userCredentials = new Schema({
  _id: { type: String, default: uuid.v1 },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileComplete: {
    type: Boolean,
    required: true,
  },
});

// create models from mongoose schemas
const user = mongoose.model("users", userCredentials);

// package the models in an object to export
module.exports = { user };
