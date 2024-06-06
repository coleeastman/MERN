// EXPRESS APP SETUP

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const axios = require('axios')

// express app stored in constant
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes handler to react to requests
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        // dotenv package loads environment variables from .env file to a process.env object
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// OPEN AI CONNECTION
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: message,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.9,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            }
        });

        const reply = response.data.choices[0].text.trim();
        console.log('connected to OpenAI');
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with OpenAI API');
    }
})
