const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connection string do Supabase (COLE AQUI)
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:9c6de99cc7fc0501e7120672ea6f1024739494b3@db.strkpnvindjzneebybzz.supabase.co:5432/postgres";

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
  try {
    console.log("Buscando dados do Supabase...");
    const result = await pool.query('SELECT * FROM "Items"');
    console.log("✓ Dados:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ ERRO:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}