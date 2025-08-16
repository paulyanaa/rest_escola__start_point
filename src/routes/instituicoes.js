const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.instituicao ORDER BY id_instituicao');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.instituicao WHERE id_instituicao = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Instituição não encontrada' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { tx_sigla, tx_descricao } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO escola.instituicao (tx_sigla, tx_descricao) VALUES ($1,$2) RETURNING *',
    [tx_sigla, tx_descricao]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { tx_sigla, tx_descricao } = req.body;
  const { rowCount, rows } = await pool.query(
    'UPDATE escola.instituicao SET tx_sigla=$1, tx_descricao=$2 WHERE id_instituicao=$3 RETURNING *',
    [tx_sigla, tx_descricao, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Instituição não encontrada' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.instituicao WHERE id_instituicao=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Instituição não encontrada' });
  res.status(204).send();
});

module.exports = router;
