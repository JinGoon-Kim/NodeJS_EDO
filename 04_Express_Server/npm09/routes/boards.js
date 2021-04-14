const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();
router.get('/', async (req, res)=>{
    try {
        const boards = await Board.findAll(); 
        res.json(boards);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.get('/writeForm', (req, res)=>{
    try {
        const luser = req.session.loginUser;
        res.render('writeform', {luser});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});
module.exports = router;