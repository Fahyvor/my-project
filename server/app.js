const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config()


const authRouter = require('./routes/auth');

app.use('/api/v1/auth', authRouter);

app.get('/', (req,res) => {
    res.send('server')
})

const port = process.env.PORT || 6000;

const uri = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();