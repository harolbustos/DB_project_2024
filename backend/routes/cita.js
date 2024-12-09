const express = require('express');

const {
    citasTrauma,
    citasMax,
    citasPacienteMenor
} = require('../controllers/cita.controllers.js')

const router = express.Router();

router.get('/traumatologo', citasTrauma);

router.get('/max', citasMax);
router.get('/paciente-menor-edad', citasPacienteMenor);


module.exports = router;