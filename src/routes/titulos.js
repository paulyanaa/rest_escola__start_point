const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.titulo ORDER BY id_titulo');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { tx_descricao } = req.body;
  const { rows } = await pool.query('INSERT INTO escola.titulo (tx_descricao) VALUES ($1) RETURNING *', [tx_descricao]);
  res.status(201).json(rows[0]);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.titulo WHERE id_titulo=$1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Título não encontrado' });
  res.json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { tx_descricao } = req.body;
  const { rowCount, rows } = await pool.query(
    'UPDATE escola.titulo SET tx_descricao=$1 WHERE id_titulo=$2 RETURNING *',
    [tx_descricao, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Título não encontrado' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.titulo WHERE id_titulo=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Título não encontrado' });
  res.status(204).send();
});

module.exports = router;
