const Sequelize = require('sequelize');
module.exports = class Member extends Sequelize.Model {

    static init(sequelize) {
        return super.init({
            userid: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            pwd: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            // underscored: false, timestamps 가 false 이므로 나오지 않기때문에 생략한다.
            modelName: 'Member',
            tableName: 'members',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Member.hasMany( db.Board, { foreignKey: 'writer', sourceKey: 'userid', onDelete: 'cascade'});
    }
};