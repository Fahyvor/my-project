const express = require('express');
const app = express();

const authRouter = require('./routes/auth');

app.use('/api/v1/auth', authRouter);

app.get('/', (req,res) => {
    res.send('server')
})

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`Connected on port ${port}`)
});