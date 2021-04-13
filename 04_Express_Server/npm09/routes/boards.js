const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

abc = (x, y, z) => x+y;

router.get('/', async (req, res) => {
    try{
        const boards = await Board.findAll();
        res.json(boards);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/writeForm', async (req, res) => {
    try{
        const luser = req.session.loginUser;
        res.render('writeform', {luser});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/addboard', async (req, res, next) => {
    try{
        const board = await Board.create({
            num: req.body.num,
            writer: req.body.writer,
            subject: req.body.subject,
            content: req.body.content,
        });
        console.log(board);
        res.json(board);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;