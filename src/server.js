const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { pool } = require('./db/pool');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck
app.get('/health', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT 1 as ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./utils/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/alunos', require('./routes/alunos'));
app.use('/instituicoes', require('./routes/instituicoes'));
app.use('/cursos', require('./routes/cursos'));
app.use('/disciplinas', require('./routes/disciplinas'));
app.use('/professores', require('./routes/professores'));
app.use('/leciona', require('./routes/leciona'));
app.use('/cursa', require('./routes/cursa'));
app.use('/tipos-curso', require('./routes/tipoCurso'));
app.use('/tipos-disciplina', require('./routes/tipoDisciplina'));
app.use('/titulos', require('./routes/titulos'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
