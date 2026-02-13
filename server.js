const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with YOUR Atlas connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
  try {
    console.log("=== API CALLED ===");
    console.log("Connecting to MongoDB...");
    
    await client.connect();
    console.log("✓ Connected to MongoDB");
    
    const db = client.db("Sprunki");
    console.log("✓ Selected database: Sprunki");
    
    const collection = db.collection("Sprunki");
    console.log("✓ Selected collection: Sprunki");
    
    const data = await collection.find({}).toArray();
    console.log("✓ Data retrieved:");
    console.log(data);
    console.log("Type of data:", typeof data);
    console.log("Is array?", Array.isArray(data));
    
    res.json(data);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}