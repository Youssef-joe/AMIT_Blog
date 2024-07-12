const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPass: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;