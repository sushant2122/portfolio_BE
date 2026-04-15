
const { fileDelete } = require("../../utilities/helper")
const { myEvent, EventName } = require("../../middleware/events.middleware")
const { authSvc } = require("../auth/auth.service");
const { randomStringGenerator } = require("../../utilities/helper");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

class AuthController {

    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const filter = { email: email };

            const user = await authSvc.getSingleUserByFilter(filter);
            //exists
            if (bcrypt.compareSync(password, user.password)) {
                const accessToken = jwt.sign({
                    sub: user.user_id,
                    type: "access"
                }, process.env.JWT_SECRET, {
                    expiresIn: "1 hour"
                })

                const refreshToken = jwt.sign({
                    sub: user.user_id,
                    type: "refresh"
                }, process.env.JWT_SECRET, {
                    expiresIn: "1 day"
                })
                res.json({
                    token: {
                        access: accessToken,
                        refresh: refreshToken
                    },
                    detail: {
                        _id: user.user_id,
                        name: user.full_name,
                        email: user.email,
                        role: user.role
                    },
                    message: "Welcome to " + user.role + "pannel.",
                    meta: null,
                    status: "LOGIN_SUCCESS"
                })



            } else {
                throw { code: 400, message: "Credential doesnot match", status: "CREDENTIAL_FAILED" }
            }

        } catch (exception) {
            next(exception);

        }


    }

    getUser = (req, res, next) => {

        res.json({
            result: req.authUser,
            message: "Logged in user details",
            meta: null,
            status: "LOGGED_IN_USER"
        })

    }

    forgotPassword = async (req, res, next) => {
        try {

            const { email } = req.body;
            const resettoken = randomStringGenerator(100)
            const reset_activefor = new Date(Date.now() + (60 * 60 * 3 * 1000))

            const user = await authSvc.getSingleUserByFilter({ email: email });
            await authSvc.updateUserById({ user_id: user.user_id }, { resettoken: resettoken, reset_activefor: reset_activefor })
            myEvent.emit(EventName.FORGET_PASSWORD, { name: user.full_name, email: email, token: resettoken });
            res.json({
                result: {
                    resettoken,
                    reset_activefor
                },
                message: "An email has been delivered for password reset token.",
                meta: null,
                status: "RESET_PASSWORD_TOKEN_SEND"
            })

        } catch (exception) {
            next(exception)
        }

    }

    resetPassword = async (req, res, next) => {
        try {
            const resettoken = req.params.token;

            const user = await authSvc.getSingleUserByFilter({ resettoken: resettoken });

            const { password } = req.body;

            const hashedPassword = bcrypt.hashSync(password, 10);

            let tokenExpiry = new Date(user.reset_activefor);
            const today = new Date();

            if (tokenExpiry < today) {
                throw ({ code: 400, message: "Token already expired.", status: "ACTIVATION_TOKEN_EXPIRED" });
            }


            await authSvc.updateUserById({ user_id: user.user_id }, { password: hashedPassword, resettoken: null, reset_activefor: null })

            myEvent.emit(EventName.PASSWORD_RESET_SUCCESSFUL, { name: user.full_name, email: user.email });


            res.json({
                message: "Password reset successfully.",
                status: "SUCCESS",
                meta: null
            });


        } catch (exception) {
            next(exception);
        }
    }

}
const authCtrl = new AuthController()
module.exports = authCtrl;