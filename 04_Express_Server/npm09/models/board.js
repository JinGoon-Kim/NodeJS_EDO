const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model {

    static init(sequelize) {
        return super.init({
            num: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                defaultValue: Sequelize.NOW,
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            subject: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Board.belongsTo( db.Member, { foreignKey: 'writer', targetKey: 'userid'});
    }
};