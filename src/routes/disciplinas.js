const express = require('express');
const router = express.Router();
const { pool } = require('../db/pool');

router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.disciplina ORDER BY id_disciplina');
  res.json(rows);
});

router.get('/por-curso', async (req, res) => {
    try {
        const query = `
            SELECT 
                c.tx_descricao as curso,
                COUNT(d.id_disciplina) as quantidade_disciplinas
            FROM escola.curso c
            LEFT JOIN escola.disciplina d ON d.id_curso = c.id_curso
            GROUP BY c.id_curso, c.tx_descricao
            ORDER BY c.tx_descricao
        `;
        
        const result = await pool.query(query);
        
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar disciplinas por curso:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM escola.disciplina WHERE id_disciplina = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO escola.disciplina (id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria]
  );
  res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
  const { id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria } = req.body;
  const { rowCount, rows } = await pool.query(
    `UPDATE escola.disciplina SET id_curso=$1, id_tipo_disciplina=$2, tx_sigla=$3, tx_descricao=$4, in_periodo=$5, in_carga_horaria=$6
     WHERE id_disciplina=$7 RETURNING *`,
    [id_curso, id_tipo_disciplina, tx_sigla, tx_descricao, in_periodo, in_carga_horaria, req.params.id]
  );
  if (!rowCount) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { rowCount } = await pool.query('DELETE FROM escola.disciplina WHERE id_disciplina=$1', [req.params.id]);
  if (!rowCount) return res.status(404).json({ message: 'Disciplina não encontrada' });
  res.status(204).send();
});

module.exports = router;
