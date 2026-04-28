const { DataTypes } = require("sequelize");

const certificationSchema = {
    cert_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    issuer: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    credential_id: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    verification_link: {
        type: DataTypes.STRING(500),
        allowNull: true
    },

    cert_img: {
        type: DataTypes.STRING(255), // store image URL or path
        allowNull: false
    },

    skills: {
        type: DataTypes.STRING(255), // comma-separated OR use separate table if needed
        allowNull: true
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
};

const createCertificationModel = (sequelize) => {
    return sequelize.define("Certifications", certificationSchema);
};

module.exports = { createCertificationModel };