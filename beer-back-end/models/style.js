const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const styleSchema = new Schema({
  user: { type: Number, ref: 'User' },
  styleName: {
    type: String,
    required: [true, 'Name Required']
  },
  // description: {
  //   type: String,
  // },
  brands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
  pairings: [{ type: Schema.Types.ObjectId, ref: 'Pairing' }]
});

const Style = mongoose.model("Style", styleSchema);
module.exports = Style;
