const { DataTypes } = require("sequelize");

const skillSchema = {
    skill_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    skill_img: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

};

const createSkillModel = (sequelize) => {
    return sequelize.define("Skills", skillSchema);
};

module.exports = { createSkillModel };