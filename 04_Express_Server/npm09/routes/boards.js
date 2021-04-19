const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const Reply = require('../models/reply');
const upload = require('../config/multer');

const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const boards = await Board.findAll({
            order: [['created_at', 'DESC']],
        });
        res.json(boards);
        
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.get('/writeForm' ,(req, res)=>{
    try {
        const luser = req.session.loginUser;
        res.render('writeform', {luser});
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

router.post('/writeBoard', upload.single('image'), async (req, res, next)=>{
    try {
        let board = {
            subject: req.body.subject,
            writer: req.body.userid,
            text: req.body.text,
        };
        if ( req.file ){
            board.filename = req.file.filename;
            board.realfilename = req.file.originalname;
        }
        let result = await Board.create( board );

        // console.log(board);
        res.json(result);
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

router.post('/update', upload.single('image'), async (req, res, next) => {
    try{
        /*
        let board = {
            subject: req.body.subject,
            text: req.body.text,
        };
        if ( req.file ){
            board.filename = req.file.filename;
            board.realfilename = req.file.originalname;
        }
        
        let result = await Board.update( board );
        */

        let update;
        if ( req.file ){
            update = await Board.update( {
                subject: req.body.subject,
                text: req.body.text,
                filename : req.file.filename,
                realfilename: req.file.originalname,
            },{
                where: {id: req.body.id},
            });
        }else {
            update = await Board.update( {
                subject: req.body.subject,
                text: req.body.text,
            },{
                where: {id: req.body.id},
            });
        }
        res.json(update);
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
        const luser = req.session.loginUser;
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
router.get('/countReply/:board_num', async (req, res, next) => {
    try{
        const replyCount = await Reply.findAndCountAll({
            where: { board_num: req.params.board_num },
        });
        // console.log("실행 :", replyCount.count);
        res.json(replyCount);
    }catch(err){
        console.error(err);
        next(err);
    }
});



module.exports = router;