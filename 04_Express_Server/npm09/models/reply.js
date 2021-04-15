const Sequelize = require('sequelize');
module.exports = class Reply extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            created_at:{
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false, 
            modelName: 'Reply',
            tableName: 'replys',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    static associate(db){
        db.Reply.belongsTo( db.Member, { foreignKey: 'writer', sourceKey: 'userid' , 
                                                            onDelete: 'cascade' } );
        db.Reply.belongsTo( db.Board, { foreignKey: 'board_num', sourceKey: 'id' , 
                                                                onDelete: 'cascade'})
    }
};