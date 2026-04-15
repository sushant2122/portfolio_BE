const Joi = require("joi");

const createSkillDTO = Joi.object({
    skill_img: Joi.string().optional(),
    name: Joi.string().max(255).required(),
    level: Joi.number().required(),



});

const updateSkillDTO = Joi.object({
    skill_img: Joi.string().optional(),
    name: Joi.string().max(255).optional(),
    level: Joi.number().optional()

});



module.exports = {
    createSkillDTO,
    updateSkillDTO
};