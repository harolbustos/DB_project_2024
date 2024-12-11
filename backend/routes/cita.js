const express = require('express');

const {
    citasTrauma,
    citasGeneral,
    citasMax,
    citasPacienteMenor,
    motivosMasComunes,
    agendarCita
} = require('../controllers/cita.controllers.js')

const router = express.Router();

router.get('/', (req, res) => {
    res.render('citas');
});


router.post('/agendar', agendarCita);

router.get('/traumatologo', citasTrauma); 
router.get('/general', citasGeneral);

router.get('/max', citasMax);
router.get('/paciente-menor-edad', citasPacienteMenor);
router.get('/motivos-mas-comunes', motivosMasComunes);

module.exports = router;