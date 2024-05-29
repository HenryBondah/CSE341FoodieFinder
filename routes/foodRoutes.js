const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/', foodController.createFood);
router.get('/', foodController.getAllFoods);

// Placeholder for PUT and DELETE routes for documentation purposes
router.put('/:id', (req, res) => {
  res.status(501).json({ message: 'Not Implemented' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not Implemented' });
});

module.exports = router;
