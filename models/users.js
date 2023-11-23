const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  likes: Boolean,
});

const User = mongoose.model('users', userSchema);

module.exports = User;