const Joi = require("joi");

const createExperienceDTO = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().required(),
    is_active: Joi.boolean().optional()
});

const updateExperienceDTO = Joi.object({

    title: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    is_active: Joi.boolean().optional()
});



module.exports = { createExperienceDTO, updateExperienceDTO };