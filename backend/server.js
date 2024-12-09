const express = require('express');
const cors = require("cors");
const app = express();
const { PORT } = require('./config.js');
const path = require('path');
const dotenv = require('dotenv').config();
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

app.get('/home', jwtAuthenticated, async(req, res) => {
    const currentUser = await getCurrentUser(req);
    res.render('home', {user: {name: currentUser.name}});
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})