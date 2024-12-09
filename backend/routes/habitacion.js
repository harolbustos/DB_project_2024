const express = require('express');
const router = express.Router();

const {
    habitacionCantEnfe,
    habitacion5Enfe
} = require('../controllers/habitacion.controllers');

router.get('/:id/total-enfermeras', habitacionCantEnfe)
router.get('/5-mas-enfermeras', habitacion5Enfe)

module.exports = router;