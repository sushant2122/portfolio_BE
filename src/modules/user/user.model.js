const { DataTypes } = require("sequelize");
const userSchema = {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    profile_img: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    resettoken: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    reset_activefor: {
        type: DataTypes.DATE,
    },

};

const createUserModel = (sequelize) => {
    const User = sequelize.define('Users', userSchema);
    return User;
};

module.exports = {
    createUserModel
};
