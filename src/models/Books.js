const { Schema, model } = require('mongoose');
const collectionName = 's_books'

const schema = Schema({
  _id: { type: String, require: true },
  name: { type: String },
  author: { type: String },
  year: { type: String },
  editorial: { type: String },
  categoryName: { type: String },
  isBorrowed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false },
},{
  strict: true,
  collectio: collectionName,
  _id: false
})

module.exports = model(collectionName, schema)