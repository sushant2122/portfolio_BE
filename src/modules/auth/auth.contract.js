const Joi = require("joi");


//setting the password 
const forgotPasswordDTO = Joi.object({
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).messages({
        "string.pattern.base": "password must have atleast 8 digit with on capital letter special character and number"
    }),
    confirmpassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only": "password and confirm password does not match"
    }),

});

//checks email
const resetDTO = Joi.object({
    email: Joi.string().email().required()
});

module.exports = { forgotPasswordDTO, resetDTO }