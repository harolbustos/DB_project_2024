const pool = require('../db.js');

const enfermera1MasHab = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.nombre, e.turno, COUNT(ah.num_hab) AS total_habitaciones
            FROM enfermera e
            JOIN ayudaHabitacion ah ON e.id_enfermera = ah.id_enfermera
            GROUP BY e.nombre, e.turno
            HAVING COUNT(ah.num_hab) > 1
            ORDER BY total_habitaciones DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener enfermeras con más de una habitación asignada');
    }
}

const obtenerTodasEnfermeras = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ENFERMERA ORDER BY id_enfermera ASC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la lista de enfermeras');
    }
};


module.exports = { enfermera1MasHab, obtenerTodasEnfermeras };