const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.aluno ORDER BY id_aluno');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.aluno WHERE id_aluno = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { tx_nome, tx_sexo, dt_nascimento } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO escola.aluno (tx_nome, tx_sexo, dt_nascimento) VALUES ($1,$2,$3) RETURNING *',
    [tx_nome, tx_sexo, dt_nascimento]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { tx_nome, tx_sexo, dt_nascimento } = req.body;
  const { rowCount, rows } = await pool.query(
    'UPDATE escola.aluno SET tx_nome=$1, tx_sexo=$2, dt_nascimento=$3 WHERE id_aluno=$4 RETURNING *',
    [tx_nome, tx_sexo, dt_nascimento, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.aluno WHERE id_aluno=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.status(204).send();
});

module.exports = router;
