const express = require('express');
const router = express.Router();
const pool = require('../config').pool;

router.post('/', (req, res) => {

});

router.post('/answer', (req, res) => {
    let flag_id = req.body['id'];
    let flag = req.body['flag'];
    let token = req.body['token'];
    let player_id = -1;
    let player_points = -1;
    pool.query('SELECT id, points FROM players WHERE token=$1', [token], (error, results) => {
        if(error){
            console.log(error);
        }
        if(results.rows[0] != undefined){
            player_id = results.rows[0]['id'];
            player_points = results.rows[0]['points'];

            pool.query('SELECT flag, points FROM flags WHERE id=$1', [flag_id], (error1, results1) => {
                if(error1){
                    res.status(400).json({"success": "false"});
                }
                if(results1.rows[0] != undefined)
                {
                    if(flag === results1.rows[0]['flag']){
                        pool.query('UPDATE players SET points=$1 WHERE id=$2', [(player_points + results1.rows[0]['points']), player_id]);
                        res.status(200).json({"correct" : "true", "points" : (player_points + results1.rows[0]['points']).toString()});
                    }
                    else{
                        res.status(200).json({"correct" : "false"});
                    }
                }
            });
        }
        else{
            
        }
    })

    if(player_id !== -1){
        
    }
})

module.exports = router;