var mongoose = require('mongoose');
var usersSchema = require('../Schemas/user');

module.exports = mongoose.model('User', usersSchema);
