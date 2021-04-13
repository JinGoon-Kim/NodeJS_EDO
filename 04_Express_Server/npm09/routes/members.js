const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

router.get('/', (req, res) => {
    try{
        res.render('member_insert', { });
    }catch(err) {
        console.error(err);
    }
});

router.post('/addmember', async (req, res, next) => {
    try{
        const member = await Member.create({
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        console.log(member);
        res.json(member);
    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const members = await Member.findOne({
            where: {userid: req.body.userid},
        });
        // 결과가 있으면 세션에 저장, 검색 결과 전송
        if (members) {
            if (members.userid == req.body.userid && members.pwd == req.body.pwd) {
                req.session.loginUser = members;
                res.json(members);
            }else { // 비번이 틀리면 검색 결과만 전송
                console.log(members);
                res.json(members);
            }
        }
        // 아니면 빈 문자 전송
        else res.json('');
        
        console.log(members);
        res.json(members);

    }catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/:id/boards', async (req, res, next) => {
    try{
        const comments = await Board.findAll({
            include: {
                model: Member,
                where: { userid: req.params.userid},
            },
        });
        console.log(boards);
        res.json(boards);
    }catch(err) {
        console.error(err);
    }
});

module.exports = router;