const pool = require('../db.js');

const agendarCita = async (req, res) => {
    try {
        const { id_usuario, id_doctor, motivo, fecha } = req.body;

        if (!id_usuario || !id_doctor || !motivo || !fecha) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await pool.query(
            `INSERT INTO cita (id_usuario, id_doctor, motivo, fecha)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [id_usuario, id_doctor, motivo, fecha]
        );

        res.status(201).json({ message: 'Cita agendada exitosamente', cita: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agendar la cita' });
    }
};


const citasTrauma = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT USUARIO.NAME, DOCTOR.NOMBRE, DOCTOR.ESPECIALIDAD, CITA.FECHA
            FROM USUARIO
            JOIN CITA ON USUARIO.ID_USUARIO = CITA.ID_USUARIO
            JOIN DOCTOR ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            WHERE DOCTOR.ESPECIALIDAD = 'Traumatologo'
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener cita con Traumatologo');
    }
}

const citasGeneral = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT USUARIO.NAME AS paciente, USUARIO.APELLIDO AS apellido, DOCTOR.NOMBRE AS doctor, DOCTOR.ESPECIALIDAD, CITA.FECHA
            FROM USUARIO
            JOIN CITA ON USUARIO.ID_USUARIO = CITA.ID_USUARIO
            JOIN DOCTOR ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            WHERE DOCTOR.ESPECIALIDAD = 'General'
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener cita con doctores generales');
    }
};


const citasMax = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DOCTOR.NOMBRE, DOCTOR.ESPECIALIDAD, COUNT(CITA.COD_CITA) AS TOTAL_CITAS
            FROM DOCTOR
            JOIN CITA ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            GROUP BY DOCTOR.ID_DOCTOR, DOCTOR.NOMBRE, DOCTOR.ESPECIALIDAD
            ORDER BY TOTAL_CITAS DESC
            LIMIT 1`);
            res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el doctor con más citas');
    }
};

const citasPacienteMenor = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DOCTOR.NOMBRE, DOCTOR.ESPECIALIDAD, COUNT(CITA.COD_CITA) AS TOTAL_PACIENTES
            FROM DOCTOR
            JOIN CITA ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            JOIN USUARIO ON USUARIO.ID_USUARIO = CITA.ID_USUARIO
            WHERE USUARIO.AGE < 18
            GROUP BY DOCTOR.ID_DOCTOR, DOCTOR.NOMBRE, DOCTOR.ESPECIALIDAD
            ORDER BY TOTAL_PACIENTES DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener doctores que atendieron pacientes menores de edad');
    }
}

const motivosMasComunes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT CITA.MOTIVO, COUNT(CITA.MOTIVO) AS TOTAL
            FROM CITA
            GROUP BY CITA.MOTIVO
            ORDER BY TOTAL DESC
            LIMIT 3
        `);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay motivos registrados' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los motivos más comunes');
    }
};


module.exports = { 
    citasTrauma, 
    citasMax, 
    citasPacienteMenor, 
    citasGeneral, 
    motivosMasComunes, 
    agendarCita }