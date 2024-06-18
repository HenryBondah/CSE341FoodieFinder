const { body, validationResult } = require('express-validator');
const Food = require('../models/Food');

exports.createFood = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('discount').isNumeric().withMessage('Discount must be a number'),
  body('location').notEmpty().withMessage('Location is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('vendor').notEmpty().withMessage('Vendor is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, price, discount, location, category, vendor } = req.body;
    try {
      const newFood = new Food({ name, price, discount, location, category, vendor });
      await newFood.save();
      res.status(201).json(newFood);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFood = [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('discount').optional().isNumeric().withMessage('Discount must be a number'),
  body('location').optional().notEmpty().withMessage('Location is required'),
  body('category').optional().notEmpty().withMessage('Category is required'),
  body('vendor').optional().notEmpty().withMessage('Vendor is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedFood) {
        return res.status(404).json({ message: 'Food not found' });
      }
      res.status(200).json(updatedFood);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];

exports.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
