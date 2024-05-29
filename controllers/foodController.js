const Food = require('../models/Food');

exports.createFood = async (req, res) => {
  const { name, price, discount, location, category, vendor } = req.body;
  try {
    const newFood = new Food({ name, price, discount, location, category, vendor });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
