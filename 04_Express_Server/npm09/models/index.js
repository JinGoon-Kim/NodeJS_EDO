const Sequelize = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// export 된 객체들 임포트
const Member = require('./member');
const Board = require('./board');

//
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;   // 데이터 베이스 연결정보가 저장된 객체
db.Sequelize = Sequelize;   // 설치된 Seqelize 객체

// db 연결 및 실행
db.Member = Member;
db.Board = Board;

Member.init(sequelize);
Board.init(sequelize);
Member.associate(db);
Board.associate(db);
//
module.exports = db;