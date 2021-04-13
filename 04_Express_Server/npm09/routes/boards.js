const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        
    }catch(err) {
        console.error(err);
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
/*
router.get('/', async (req, res, next) => {
    try{
        const board = await Board.findAll();
        res.json(board);
    }catch(err) {
        console.error(err);
        next(err);
    }
});
*/
module.exports = router;