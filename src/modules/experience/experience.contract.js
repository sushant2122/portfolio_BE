const Joi = require("joi");

const createExperienceDTO = Joi.object({
    title: Joi.string().max(255).required(),
    position: Joi.string().max(255).required(),
    from: Joi.string().required(),
    to: Joi.date().optional()
});

const updateExperienceDTO = Joi.object({

    title: Joi.string().max(255).optional(),
    position: Joi.string().max(255).optional(),
    from: Joi.date().optional(),
    to: Joi.date().optional()
});



module.exports = { createExperienceDTO, updateExperienceDTO };