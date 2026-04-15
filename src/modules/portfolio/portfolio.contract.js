const Joi = require("joi");

const createPortfolioDTO = Joi.object({
    portfolio_img: Joi.string().optional(),
    name: Joi.string().max(255).required(),
    live_URL: Joi.string().max(255).uri().optional(),
    git_URL: Joi.string().max(255).uri().required(),
    description: Joi.string().optional().min(10),


});

const updatePortfolioDTO = Joi.object({
    portfolio_img: Joi.string().optional(),
    name: Joi.string().max(255).optional(),
    live_URL: Joi.string().max(255).uri().optional(),
    git_URL: Joi.string().max(255).uri().optional(),
    description: Joi.string().optional().min(10),
});



module.exports = {
    createPortfolioDTO,
    updatePortfolioDTO
};