const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  foodPreferences: [String]
});

module.exports = mongoose.model('User', UserSchema);
