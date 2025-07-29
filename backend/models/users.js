const model = require('mongoose');

const {UserSchema} = require('../schemas/users');

const UserModel = model('User', UserSchema);

module.exports = {UserModel};