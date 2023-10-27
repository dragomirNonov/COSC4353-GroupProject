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
    maxlength: 25,
  },
  lastName: {
    type: String,
    require: true,
    maxlength: 25,
  },
  address1: {
    type: String,
    require: true,
    maxlength: 100,
  },
  address2: {
    type: String,
    maxlength: 100,
  },
  city: {
    type: String,
    require: true,
    maxlength: 100,
  },
  state: {
    type: String,
    require: true,
  },
  zipCode: {
    type: String,
    require: true,
    maxlength: 9,
  },
});

const profile = mongoose.model("profiles", clientInformation);

// need to check
const quoteSchema = new Schema({
  userID: { type: String, required: true },
  requestDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  gallons: { type: Number, required: true },
  pricePerGallon: { type: Number },
  totalAmount: { type: Number },
  fuelRate: { type: Number },
});

const quote = mongoose.model("quotes", quoteSchema);
// package the models in an object to export
module.exports = { user, profile, quote };
