const express = require('express');
const Member = require('../models/member');
const Board = require('../models/board');

const router = express.Router();

router.post('join-form', async (req, res, next) => {
    console.log('1');
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

router.get('/', async (req, res, next) => {
    try{
        const members = await Member.findAll();
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