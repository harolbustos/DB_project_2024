const express = require('express');
const router = express.Router();
const { enfermera1MasHab, obtenerTodasEnfermeras } = require('../controllers/enfermera.controllers');

router.get('/', (req, res) => {
    res.render('enfermeras');
});

router.get('/todas', obtenerTodasEnfermeras);
router.get('/1-mas-hab', enfermera1MasHab);

module.exports = router;