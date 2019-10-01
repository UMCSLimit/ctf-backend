const express = require('express');
const pool = require('./config');

const checkRouter = require('./routes/check');
const playersRouter = require('./routes/players');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/check', checkRouter);
app.use('/players', playersRouter);

app.listen(3000, () =>{
    console.log("listening on 3000");
})