const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename:'./dev.sqlite3'
    },
    useNullAsDefault: true,
}

const db = knex(knexConfig);

const server = express();
server.use(express.json());
server.use(helmet());

// Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get // Get 
server.get('/api/cohorts', async (req, res) => {
    try{
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID // Get by ID 
server.get('/api/cohorts/:id', async (req, res) => {
    try{
        const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(cohort);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post // Post 
server.post('/api/cohorts', async (req, res) => {
    try{
        const [id] = await db('cohorts').insert(req.body);
        const cohort = await db('cohorts')
            .where({ id })
            .first();
        res.status(201).json(cohort);
    } catch(error) {
        res.status(500).json(error);
    }
});

// Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete // Delete
server.delete('/api/cohorts/:id', async (req, res) => {
    try{
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .del();
        if (count > 0){
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Cohort cannot delete!'});
        }
    } catch(error){
        res.status(500).json(error);
    }
});

// Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update // Update
server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
            .where({ id: req.params.id })
            .update(req.body);
        
            if (count > 0){
                const cohort = await db('cohorts')
                    .where({ id: req.params.id })
                    .first();
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: 'Cohort did not update!'});
            }
    } catch(error) {
        res.status(500).json(error);
    }
});

const port = 5000;
server.listen(port, function(){
    console.log(`Server listening on port 5000`);
});