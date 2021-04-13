const express = require('express');
const User = require('../models/member');
const Comment = require('../models/board');

const router = express.Router();

router.get('/', (req, res) => {
    try{
        res.render('login', { });
        // res.sendFile( path.join( __dirname, '../views/login.html'))
        // 위와 같이 사용할 수 있지만 path가 requir 되어야되고 sendFile은 절대 경로를 사용함.
    }catch (err){
        console.error(err);
        next(err);
    }
});
router.get('/joinform', (req, res) => {
    try{
        res.render('joinform', { });
    }catch (err){
        console.error(err);
        next(err);
    }
});

module.exports = router;