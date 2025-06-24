const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Read meal data
app.get('/api/meals', async (req, res) => {
    try {
        const data = await fs.readFile('sample-meal-data.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading meal data:', error);
        res.status(500).json({ error: 'Failed to read meal data' });
    }
});

// Save meal data
app.post('/api/meals', async (req, res) => {
    try {
        const mealData = req.body;
        await fs.writeFile('sample-meal-data.json', JSON.stringify(mealData, null, 2));
        console.log('Meal data saved successfully');
        res.json({ success: true, message: 'Meal data saved successfully' });
    } catch (error) {
        console.error('Error saving meal data:', error);
        res.status(500).json({ error: 'Failed to save meal data' });
    }
});

// Read meal database
app.get('/api/meals-db', async (req, res) => {
    try {
        const data = await fs.readFile('meal-database.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading meal database:', error);
        res.status(500).json({ error: 'Failed to read meal database' });
    }
});

// Save meal database
app.post('/api/meals-db', async (req, res) => {
    try {
        const mealDatabase = req.body;
        await fs.writeFile('meal-database.json', JSON.stringify(mealDatabase, null, 2));
        console.log('Meal database saved successfully');
        res.json({ success: true, message: 'Meal database saved successfully' });
    } catch (error) {
        console.error('Error saving meal database:', error);
        res.status(500).json({ error: 'Failed to save meal database' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});