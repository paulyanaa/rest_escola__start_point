const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.curso ORDER BY id_curso');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.curso WHERE id_curso = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Curso não encontrado' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO escola.curso (id_instituicao, id_tipo_curso, tx_descricao) VALUES ($1,$2,$3) RETURNING *',
    [id_instituicao, id_tipo_curso, tx_descricao]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id_instituicao, id_tipo_curso, tx_descricao } = req.body;
  const { rowCount, rows } = await pool.query(
    'UPDATE escola.curso SET id_instituicao=$1, id_tipo_curso=$2, tx_descricao=$3 WHERE id_curso=$4 RETURNING *',
    [id_instituicao, id_tipo_curso, tx_descricao, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Curso não encontrado' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.curso WHERE id_curso=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Curso não encontrado' });
  res.status(204).send();
});

module.exports = router;
