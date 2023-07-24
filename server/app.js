const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
// const connectDB = require('./db/connect');
require('dotenv').config()


const authRouter = require('./routes/auth');

app.use('/api/v1/auth', authRouter);

app.get('/', (req,res) => {
    res.send('server')
})

const port = process.env.PORT || 6000;

const uri = process.env.MONGO_URI;

async function connectToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');

    const database = client.db('MyProject');

    await app.listen(port, () => {
        console.log(`Connected on port ${port}`)
    });
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();


