const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
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
        /*
        const result = await Board.findOne({
            where: {id : req.params.id},
        }); //레코드
        const result_cnt = await Board.findOne({
           attributes : ['readCount'],
           where : {id : req.params.id}, 
        }); // 레코드
        let cnt = result.readCount; // result_cnt.readCount
        cnt = cnt + 1;
        const readCount = await Board.update({
            readCount: (board.getDataValue('readCount') + 1),
        },{
            where: {id: req.params.id},
        });
        */
        const luser = req.session.loginUser;
        let board = await Board.findOne({
            where: { id: req.params.id },
        });
        const readCount = await Board.update({
            readCount: (board.getDataValue('readCount') + 1),
        },{
            where: {id: req.params.id},
        });
        board = await Board.findOne({
            where: { id: req.params.id },
        });
        res.render('boardView', {board, luser});
    }catch(err) {
        console.error(err);
        next(err);
    }
});
router.get('/UpdateForm/:id', async (req, res, next) => {
    try{
        const board = await Board.findOne({
            where: { id: req.params.id },
        });
        res.render('UpdateForm', {board});
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try{
        const result = await Board.update({
            subject: req.body.subject,
            text: req.body.text,
        },{
            where: {id: req.body.id},
        });
        res.redirect('/boards/boardView2/' + req.body.id);
    }catch(err){
        console.error(err);
        next(err);
    }
});
router.get('/boardView2/:id', async (req, res, next) => {
    try{
        const board = await Board.findOne({
            where: { id: req.params.id },
        });
        res.render('boardView', {board, luser});
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/getReply', async (req, res, next) => {
    try {
        const board = await Reply.findAll({
            where: { board_num : req.body.boardnum},
            order: [['created_at', 'DESC']],
        });
        res.json(board);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/replyinsert', async (req, res, next)=>{
    const writeUser = req.session.loginUser;
    try {
        const reply = await Reply.create({
            content: req.body.text,
            writer: writeUser.userid,
            board_num: req.body.id,
        });
        res.json({
            addReply: true
        });
    } catch (err) {
        console.error(err);
        next(err); 
    }
});
router.post('/deletereply', async (req, res, next)=>{
    try {
        const result = await Reply.destroy( { where: {id: req.body.id} } );
        res.json({
            isUpdate: true
        });
    }catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;