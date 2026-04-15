const { DataTypes } = require("sequelize");

const portfolioSchema = {
    portfolio_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    portfolio_img: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    live_URL: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    git_URL: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
};

const createPortfolioModel = (sequelize) => {
    return sequelize.define("Portfolios", portfolioSchema);
};

module.exports = { createPortfolioModel };