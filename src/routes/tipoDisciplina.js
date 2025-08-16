const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.tipo_disciplina ORDER BY id_tipo_disciplina');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { tx_descricao } = req.body;
  const { rows } = await pool.query('INSERT INTO escola.tipo_disciplina (tx_descricao) VALUES ($1) RETURNING *', [tx_descricao]);
  res.status(201).json(rows[0]);
});

module.exports = router;
