'use strict'
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var PendBookSchema = schema({
    title: String,
    author: Array,
    description: String,
    year: String,
    image: String,
    info: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('PendBook', PendBookSchema);