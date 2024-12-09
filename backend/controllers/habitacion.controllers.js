const pool = require('../db.js');

const habitacionCantEnfe = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT COUNT(id_enfermera) AS total_enfermeras , num_hab
            FROM ayudaHabitacion 
            WHERE num_hab = $1
            GROUP BY num_hab;`,
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener enfermeras asignadas a la habitación');
    }
};

const habitacion5Enfe = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT h.num_habitacion, COUNT(ah.id_enfermera) AS total_enfermeras
            FROM habitacion h
            JOIN ayudaHabitacion ah ON h.num_habitacion = ah.num_hab
            GROUP BY h.num_habitacion
            HAVING COUNT(ah.id_enfermera) > 5
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener habitaciones con más de 2 enfermeras');
    }
};

module.exports = { habitacionCantEnfe, habitacion5Enfe }