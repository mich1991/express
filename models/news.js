var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const newsSchema = new Schema({
    author: ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema)