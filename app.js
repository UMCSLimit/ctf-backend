const express = require('express');
const pool = require('./config');
const cors = require('cors');
const checkRouter = require('./routes/check');
const playersRouter = require('./routes/players');
const problemsRouter = require('./routes/problems');
const app = express();

app.use(express.json());
app.use('/static', express.static('public'))
app.use(express.urlencoded());
app.use(cors());
app.use('/check', checkRouter);
app.use('/players', playersRouter);
app.use('/problems', problemsRouter);

app.listen(3000, () =>{
    console.log("listening on 3000");
})