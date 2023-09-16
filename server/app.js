const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());
app.use(cors());

// Allow cross-origin requests from http://localhost:3000
app.use((req, res, next) => {
  console.log('Received request from:', req.headers.origin);
  next();
});




const authRouter = require('./routes/auth');

app.use('/api', authRouter);

app.post('/api', (req, res) => {
  res.json(req.body)
})

app.get('/', (req, res) => {
  res.json(req.body);
  res.send('server');
});

const port = process.env.PORT || 6000;

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

// app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
