const express = require('express');
const cors = require("cors");
const app = express();
const { PORT } = require('./config.js');
const path = require('path');
var jwtAuthenticated = require('./helpers/jwtAuthenticated.js');
var getCurrentUser = require('./helpers/getCurrentUser.js');
var bodyParser = require('body-parser');

const userRouter = require('./routes/users.js');
const citaRouter = require('./routes/cita.js');
const habitacionRouter = require('./routes/habitacion.js');
const enfermeraRouter= require('./routes/enfermera.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

app.use('/user', userRouter);
app.use('/citas', citaRouter);
app.use('/habitacion', habitacionRouter);
app.use('/enfermera', enfermeraRouter);

app.get('/', (req, res) => {
    res.redirect('home')
});

app.get('/home', (req, res) => {
    res.render('home', { message: "Bienvenido a la gestion del centro medico" });
});

app.get('/pacientes', (req, res) => {
    res.render('pacientes', { title: 'Gestión de Pacientes' });
});

app.get('/citas', (req, res) => {
    res.render('citas');
});

app.get('/enfermeras', (req, res) => {
    res.render('enfermeras');
});

app.get('/habitaciones', (req, res) => {
    res.render('habitaciones');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})