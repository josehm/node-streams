const mongoose = require('mongoose')

const { Schema } = mongoose
const SchemaObjectId = Schema.ObjectId

const schema = new Schema({
  _id: { type: SchemaObjectId, default: mongoose.Types.ObjectId },
  used: {
    type: Boolean,
    required: true,
    default: false,
    index: true,
  },
  position: {
    type: Number,
    required: true,
    index: true,
  },
  prize: {
    type: String,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: false,
    index: true,
  },
  redeemDate: {
    type: Date, 
    required: false, 
  },
}, { timestamps: true })

function create(slug) {
  return mongoose.model(`${slug}.prizes`, schema)
}

module.exports = {
  create,
  schema,
}