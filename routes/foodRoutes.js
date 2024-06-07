// foodRoutes.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/', foodController.createFood);
router.get('/', foodController.getAllFoods);
router.put('/:id', foodController.updateFood);
router.delete('/:id', foodController.deleteFood);

module.exports = router;
