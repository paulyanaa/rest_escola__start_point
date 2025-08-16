const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.professor ORDER BY id_professor');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.professor WHERE id_professor = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Professor não encontrado' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO escola.professor (id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
  const { rowCount, rows } = await pool.query(
    `UPDATE escola.professor SET id_titulo=$1, tx_nome=$2, tx_sexo=$3, tx_estado_civil=$4, dt_nascimento=$5, tx_telefone=$6
     WHERE id_professor=$7 RETURNING *`,
    [id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Professor não encontrado' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.professor WHERE id_professor=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Professor não encontrado' });
  res.status(204).send();
});

module.exports = router;
