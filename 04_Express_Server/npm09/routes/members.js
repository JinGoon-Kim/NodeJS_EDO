const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');
const router = express.Router();

router.get('/', (req, res)=>{
    try {
        res.render('member_insert', {})
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/addmember', async (req, res, next)=>{
    try {
        const member = await Member.create({
            userid: req.body.userid,
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        });
        console.log(member); 
        res.json(member); 
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/login', async (req, res, next)=>{
    try {
        const member = await Member.findOne({
            where: { userid: req.body.userid },
        });
        // 결과가 있으면 아이디 비번 확인후 세션에 저장. 검색 결과 전송
        if(member){
            if(member.userid == req.body.userid && member.pwd == req.body.pwd) {
                 req.session.loginUser = member;
                 res.json(member);
            }else{  // 비번이 틀리면 검색 결과만 전송
                //console.log(member);
                res.json(member);   
            }
        }else{  // 결과가 없으면 빈문자 전송
            res.json(''); 
        }        
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/memberUpdateForm', (req, res)=>{
    try {
        const luser = req.session.loginUser;
        res.render('memberUpdateForm', {luser});
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/updatemember', async (req, res, next) => {
    try{
        const result = await Member.update({
            pwd: req.body.pwd,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
        },{
            where: {userid: req.body.userid},
        });
        const member = await Member.findOne({
            where: { userid: req.body.userid },
        });
        req.session.loginUser = member;
        res.json({
            isUpdate: true
        });
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;