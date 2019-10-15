const express = require('express');
const router = express.Router();
const pool = require('../config').pool;
const crypto = require('crypto');

router.get('/', (req, res) => {
    pool.query('SELECT * FROM players ORDER BY points', (error, results) => {
        if(error){
            res.status(400).json({"success": "false"});
        }
        if(results.rows !== undefined)
        {
            res.status(200).json(results.rows);
        }
    })
});

router.post('/register', (req, res) => {
    let nickname = req.body['nickname'];
    let token = crypto.randomBytes(10).toString('hex');
    pool.query('INSERT INTO players(nickname, token, points) VALUES ($1, $2, $3)', [nickname, token, 0], (error, results) => {
        if(error){
            res.status(400).json({"success": "false"});
        }
        res.status(200).json({"token": token, "nickname": nickname});
    })
});

router.get('/getplayer/:token', (req, res) => {
    const token = req.params['token'];
    pool.query('SELECT nickname, points FROM players WHERE token=$1', [token], (error, results) => {
        if(error){
            res.status(400).json({"success": "false"});
        }
        if(results.rows[0] !== undefined)
        {
            res.status(200).json(results.rows[0]);
        }
    });
});

module.exports = router;
