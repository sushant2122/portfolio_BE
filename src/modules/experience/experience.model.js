const { DataTypes } = require("sequelize");

const experienceSchema = {
    experience_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    position: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    from: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    to: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
};


const createExperienceModel = (sequelize) => {
    return sequelize.define("Experiences", experienceSchema, {
        timestamps: false
    });
};
module.exports = { createExperienceModel };