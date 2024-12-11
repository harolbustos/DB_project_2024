const pool = require('../db.js');
var jwt = require('jsonwebtoken');


const userRegister = async (req, res) => {
    try {
        const data = req.body;
        const { rows } = await pool.query(
            "INSERT INTO USUARIO (rut, name, mail, password, sex, age)" + 
            "VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [data.rut, data.name, data.mail, data.password, data.sex, data.age]
            
        );
        return res.json({ message: 'Registro exitoso'});
    } catch (error) {

        if(error.code === '23505') {
            if (error.detail.includes('rut')) {
                return res.status(400).json({ error: 'rut ya registrado' })
            }
            if (error.detail.includes('mail')) {
                return res.status(400).json({ error: 'mail ya registrado' })
            }
        }
        
        return res.status(500).json({ error: 'Error en el servidor' })
    }
}

const userLogin = async (req, res) => {
    try {
        const { rut, password } = req.body;

        if (!rut || !password) {
            return res.status(400).json({ 
                succes: false, message: 'RUT y contraseña son requeridos' });
        }

        const { rows } = await pool.query(
            "SELECT * FROM USUARIO WHERE rut = $1 AND password = $2",
            [rut, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ 
                succes: false, message:'credenciales incorrectas' });
        }

        const token = jwt.sign(
            { rut: rows[0].rut, name: rows[0].name},
            process.env.JWT_PASSWORD,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );

        return res.json({ 
            succes: true,
            message: 'Login exitoso',
            token: token});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            succes: false, message: 'Error en el servidor' });
    }
};

const registrarUsuario = async (req, res) => {
    try {
        const { id_usuario, num_hab, name, apellido, sexo, age, rut } = req.body;
        console.log(req.body);

        if (!id_usuario || !num_hab || !name || !apellido || !sexo || !age || !rut) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        
        const result = await pool.query(
            `INSERT INTO usuario (id_usuario, num_hab, name, apellido, sexo, age, rut)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [id_usuario, num_hab, name, apellido, sexo, age, rut]
        );

        res.status(201).json({ message: 'Paciente registrado exitosamente', paciente: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el paciente' });
    }
};


const userMaxAge = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT NAME, AGE FROM USUARIO ORDER BY AGE DESC LIMIT 1'
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay pacientes registrados' });
        }
        res.json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la edad máxima de los pacientes');
    }
};

const getAllPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuario ORDER BY id_usuario ASC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los pacientes');
    }
};


const usersTotFact = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.id_usuario, u.name, u.age, SUM(f.monto) AS total_facturado
            FROM usuario u
            JOIN factura f ON u.id_usuario = f.id_usuario
            GROUP BY u.name, u.age, u.id_usuario
            ORDER BY total_facturado DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el total de facturas por paciente');
    }
};

const userMultDoctors = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT u.name, c.fecha, COUNT(DISTINCT c.id_doctor) AS total_doctores
            FROM usuario u
            JOIN cita c ON u.id_usuario = c.id_usuario
            GROUP BY u.name, c.fecha
            HAVING COUNT(DISTINCT c.id_doctor) > 1
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener pacientes atendidos por múltiples doctores');
    }
}

module.exports = { 
    userRegister, 
    userLogin, userMaxAge, 
    usersTotFact,
    userMultDoctors,
    getAllPatients,
    registrarUsuario
};