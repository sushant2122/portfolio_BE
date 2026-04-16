const Joi = require("joi");

const createMessageDTO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    subject: Joi.string().required(),
    message: Joi.string().required().min(10),
});

const updateMessageDTO = Joi.object({
    is_read: Joi.boolean().required()
});

module.exports = {
    createMessageDTO,
    updateMessageDTO,
};