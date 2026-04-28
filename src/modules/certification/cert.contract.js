const Joi = require("joi");

// Create Certification DTO
const createCertificationDTO = Joi.object({
    title: Joi.string().max(255).required(),

    issuer: Joi.string().max(255).required(),

    issue_date: Joi.date().required(),

    expiry_date: Joi.date().optional().allow(null),

    credential_id: Joi.string().max(255).optional().allow(null, ""),

    verification_link: Joi.string().uri().max(500).optional().allow(null, ""),

    cert_img: Joi.string().max(255).optional(), // image URL or path

    skills: Joi.string().max(255).optional().allow(null, ""),

    description: Joi.string().optional().allow(null, "")
});


// Update Certification DTO
const updateCertificationDTO = Joi.object({
    title: Joi.string().max(255).optional(),

    issuer: Joi.string().max(255).optional(),

    issue_date: Joi.date().optional(),

    expiry_date: Joi.date().optional().allow(null),

    credential_id: Joi.string().max(255).optional().allow(null, ""),

    verification_link: Joi.string().uri().max(500).optional().allow(null, ""),

    cert_img: Joi.string().max(255).optional(),

    skills: Joi.string().max(255).optional().allow(null, ""),

    description: Joi.string().optional().allow(null, "")
});

module.exports = {
    createCertificationDTO,
    updateCertificationDTO
};