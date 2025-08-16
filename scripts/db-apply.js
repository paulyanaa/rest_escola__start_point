const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

(async () => {
  const pool = new Pool();
  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');
  const sqlSchema = fs.readFileSync(schemaPath, 'utf8');
  const sqlSeed = fs.readFileSync(seedPath, 'utf8');

  const reset = process.argv.includes('--reset');

  try {
    if (reset) {
      await pool.query('DROP SCHEMA IF EXISTS escola CASCADE;');
    }
    await pool.query(sqlSchema);
    await pool.query(sqlSeed);
    console.log('Banco preparado com sucesso.');
  } catch (e) {
    console.error('Erro ao preparar banco:', e);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
