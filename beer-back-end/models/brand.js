const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const brandSchema = new Schema({
  user: { type: Number, ref: 'User' },
  style: {
    type: String,
    required: [true, 'Name Required']
  },
  description: {
    type: String,
  },
  rating: Number,
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
