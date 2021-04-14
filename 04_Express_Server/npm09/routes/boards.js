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

router.post('/writeBoard', async (req, res, next)=>{
    try {
        const board = await Board.create({
            subject: req.body.subject,
            writer: req.body.writer,
            text: req.body.text,
        });
        console.log(board);
        res.json(board);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});
router.get('/boardView/:id', async (req, res, next) => {
    try{
        const board = await Board.findOne({
            where: { id: req.params.id },
        });
        res.render('boardView', {board});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;