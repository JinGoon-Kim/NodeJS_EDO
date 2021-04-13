const Sequelize = require('sequelize');

const Member = require('./member');
const Board = require('./board');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Member = Member;
db.Board = Board;

Member.init(sequelize);
Board.init(sequelize);
Member.associate(db);
Board.associate(db);

module.exports = db;
