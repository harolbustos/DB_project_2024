const express = require('express');
const router = express.Router();
const { enfermera5MasHab } = require('../controllers/enfermera.controllers');

router.get('/5-mas-hab', enfermera5MasHab);

module.exports = router;