const { Schema, model } = require('mongoose');
const collectionName = 's_books'

const schema = Schema({
  _id: { type: String, require: true },
  name: { type: String, default: '' },
  author: { type: String, default: '' },
  year: { type: String, default: '' },
  editorial: { type: String, default: '' },
  categoryName: { type: String, default: '' },
  isBorrowed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isRemove: { type: Boolean, default: false },
},{
  collectio: collectionName,
  _id: false
})

module.exports = model(collectionName, schema)