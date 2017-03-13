const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const brandSchema = new Schema({
  user: { type: String, ref: 'User' },
  style: { type: String, ref: 'Style' },
  name: { type: String },
  breweryName: { type: String },
  tastingNotes: { type: String },
  rating: { type: String }
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
