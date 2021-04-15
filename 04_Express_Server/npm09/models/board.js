const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            subject: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            readCount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db) {
        db.Board.belongsTo(db.Member, { foreignKey: 'writer', targetKey: 'userid' });
    }
};