const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pairingSchema = new Schema({
  style: { type: Number, ref: 'Style' },
  dishName: {
    type: String,
    required: [true, 'Beer Name Required']
  },
  rating: Number
});

const Pairing = mongoose.model("Pairing", pairingSchema);
module.exports = Pairing;
