const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    text: String,
    parent: String,
    type: String,
    value:Number
});

module.exports = mongoose.model('Item', itemSchema);