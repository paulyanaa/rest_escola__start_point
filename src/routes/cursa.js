const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.cursa ORDER BY id_aluno, id_disciplina, in_ano, in_semestre');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO escola.cursa (id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado]
  );
  res.status(201).json(rows[0]);
});

router.put('/', async (req, res) => {
  const { id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado } = req.body;
  const { rowCount, rows } = await pool.query(
    `UPDATE escola.cursa SET in_faltas=$5, nm_nota1=$6, nm_nota2=$7, nm_nota3=$8, bl_aprovado=$9
     WHERE id_aluno=$1 AND id_disciplina=$2 AND in_ano=$3 AND in_semestre=$4 RETURNING *`,
    [id_aluno, id_disciplina, in_ano, in_semestre, in_faltas, nm_nota1, nm_nota2, nm_nota3, bl_aprovado]
  );
  if (!rowCount) return res.status(404).json({ message: 'Matrícula não encontrada' });
  res.json(rows[0]);
});

router.delete('/', async (req, res) => {
  const { id_aluno, id_disciplina, in_ano, in_semestre } = req.body;
  const { rowCount } = await pool.query(
    'DELETE FROM escola.cursa WHERE id_aluno=$1 AND id_disciplina=$2 AND in_ano=$3 AND in_semestre=$4',
    [id_aluno, id_disciplina, in_ano, in_semestre]
  );
  if (!rowCount) return res.status(404).json({ message: 'Matrícula não encontrada' });
  res.status(204).send();
});

module.exports = router;
