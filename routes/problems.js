const express = require('express');
const router = express.Router();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

let map_tokens_to_numbers = {}

router.get('/1', (req, res) => {
    let token = req.body.token;    

    let num1 = getRandomInt(10, 100);
    let num2 = getRandomInt(500, 800);

    let obj = {
        number_1: num1,
        number_2: num2,
        time: new Date(),
        waiting: true,
    };

    map_tokens_to_numbers[token] = obj;
    res.status(200).send({'num1': num1, 'num2': num2});
});

router.post('/1', (req, res) => {
    const token = req.body.token;
    const payload = req.body.payload;

    try {
        let obj = map_tokens_to_numbers[token];

        let num1 = obj.number_1;
        let num2 = obj.number_2;
        let time = obj.time;

        let timeNow = new Date();
        
        if (timeNow.getTime() - time.getTime() > 5000) {
            res.status(400).send({'success': false, 'description': 'too slow :)'});
            return;
        }

        let splitted = payload.trim().split(' ');
        let flag = true;

        if(splitted.length !== (num2 - num1)) {
            flag = false;
            res.status(400).send({'success': false});
            return;
        }

        let i = num1;
        splitted.forEach(element => {
            let num = parseInt(element);
            if(i !== num) {
                flag = false;
            }
            i += 1;
        });
    
        map_tokens_to_numbers[token].waiting = false;

        if(flag) {
            res.status(200).send({'success': true, 'flag': 'FLAGHERE'});
        } else {
            res.status(400).send({'success': false});
        }

    } catch (error) {
        res.status(400).send({'success': false});
    }
});

module.exports = router;