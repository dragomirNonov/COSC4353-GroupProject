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

let clientInformation = new Schema({
  _id: { type: String, ref: "user" },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  address1: {
    type: String,
    require: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  zipCode: {
    type: String,
    require: true,
  },
});

const profile = mongoose.model("profiles", clientInformation);

// package the models in an object to export
module.exports = { user, profile };
