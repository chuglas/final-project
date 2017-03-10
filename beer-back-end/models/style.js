const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const styleSchema = new Schema({
  userId: { type: String, ref: 'User' },
  name: {
    type: String,
    // required: [true, 'Name Required']
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  apiId: {
    type: String,
  },
  styleBrands: [{ type: Schema.Types.ObjectId, ref: 'Brand' }],
  stylePairings: [{ type: Schema.Types.ObjectId, ref: 'Pairing' }]
});

const Style = mongoose.model("Style", styleSchema);
module.exports = Style;
