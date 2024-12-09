const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db.js');

const {
    userRegister,
    userLogin,
    userMaxAge,
    usersTotFact,
    userMultDoctors
} = require('../controllers/users.controllers.js')

const router = express.Router(); //para exportar a otro archivo

router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', userRegister);

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', userLogin);

router.get('/edad-maxima', userMaxAge);

router.get('/total-facturas', usersTotFact)

router.get('/multiples-doctors', userMultDoctors)

module.exports = router; //exportar