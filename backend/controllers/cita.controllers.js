const pool = require('../db.js');

const citasTrauma = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT USUARIO.NAME, DOCTOR.NOMBRE, CITA.ESPECIALIDAD, CITA.FECHA
            FROM USUARIO
            JOIN CITA ON USUARIO.ID_USUARIO = CITA.ID_USUARIO
            JOIN DOCTOR ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            WHERE CITA.ESPECIALIDAD = 'Traumatologo'
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener cita con Traumatologo');
    }
}

const citasMax = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DOCTOR.NOMBRE, CITA.ESPECIALIDAD, COUNT(CITA.COD_CITA) AS TOTAL_CITAS
            FROM DOCTOR
            JOIN CITA ON DOCTOR.ID_DOCTOR = CITA.ID_DOCTOR
            GROUP BY DOCTOR.ID_DOCTOR, DOCTOR.NOMBRE, CITA.ESPECIALIDAD
            ORDER BY TOTAL_CITAS DESC
            LIMIT 1`)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el doctor con más citas');
    }
};

const citasPacienteMenor = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT d.nombre, d.rut_doctor
            FROM doctor d
            JOIN cita c ON d.id_doctor = c.id_doctor
            JOIN usuario u ON c.id_usuario = u.id_usuario
            WHERE u.age < 18
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener doctores que atendieron pacientes menores de 20 años');
    }
}

module.exports = { citasTrauma, citasMax, citasPacienteMenor }