const authRouter = require('express').Router();  // Create a new router instance
const authCtrl = require("./auth.controller")
const { bodyValidator } = require("../../middleware/validator.middleware")
const { forgotPasswordDTO, resetDTO } = require("./auth.contract")
//config for uploader 
const { setPath, uploader } = require("../../middleware/uploader.middleware");
const { loginCheck } = require('../../middleware/auth.middleware');


// Signin route
authRouter.post('/signin', authCtrl.signIn);


//to get loggedin users detail
authRouter.get('/me', loginCheck, authCtrl.getUser);


// Forgot password route
authRouter.post('/forget-password', bodyValidator(resetDTO), authCtrl.forgotPassword);

// Reset password route
authRouter.patch('/reset-password/:token', bodyValidator(forgotPasswordDTO), authCtrl.resetPassword);


module.exports = authRouter;  
