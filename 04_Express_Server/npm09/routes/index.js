const express = require('express');
const User = require('../models/member');
const Comment = require('../models/board');

const router = express.Router();

router.get('/', (req, res) => {
    try{
        res.render('login', { });
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