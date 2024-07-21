const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true, unique: true },
  userPass: { type: String, required: true },
  profilePicture: {type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
});

const User = mongoose.model('User', userSchema);

module.exports = User;