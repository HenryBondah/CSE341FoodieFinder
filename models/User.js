const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  location: {
    type: String
  },
  foodPreferences: {
    type: [String]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
