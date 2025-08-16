const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.leciona ORDER BY id_professor, id_disciplina');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { id_professor, id_disciplina } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO escola.leciona (id_professor, id_disciplina) VALUES ($1,$2) RETURNING *',
    [id_professor, id_disciplina]
  );
  res.status(201).json(rows[0]);
});

router.delete('/', async (req, res) => {
  const { id_professor, id_disciplina } = req.body;
  const { rowCount } = await pool.query(
    'DELETE FROM escola.leciona WHERE id_professor=$1 AND id_disciplina=$2',
    [id_professor, id_disciplina]
  );
  if (!rowCount) return res.status(404).json({ message: 'Relação não encontrada' });
  res.status(204).send();
});

module.exports = router;
