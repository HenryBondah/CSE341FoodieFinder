const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username, location, foodPreferences } = req.body;
  try {
    const newUser = new User({ username, location, foodPreferences });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
