const express = require('express');
const router = express.Router();

const {
    habitacionCantEnfe,
    habitacion2Enfe,
    obtenerTodasHabitaciones
} = require('../controllers/habitacion.controllers');

router.get('/', (req, res) => {
    res.render('habitacion');
});

router.get('/todash', obtenerTodasHabitaciones);
router.get('/:id/total-enfermeras', habitacionCantEnfe)
router.get('/2-mas-enfermeras', habitacion2Enfe)

module.exports = router;