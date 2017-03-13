const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pairingSchema = new Schema({
  user: { type: String, ref: 'User' },
  style: { type: String, ref: 'Style' },
  name: { type: String },
  recipeLink: { type: String },
  rating: { type: String }
});

const Pairing = mongoose.model("Pairing", pairingSchema);
module.exports = Pairing;
