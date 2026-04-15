const jwt = require("jsonwebtoken");
const { authSvc } = require("../modules/auth/auth.service");
const loginCheck = async (req, res, next) => {
    try {
        let token = null;

        if (req.headers['authorization']) {
            token = req.headers['authorization']
        } else if (req.query['token']) {
            token = req.query['token']
        }
        if (!token) {
            next({ code: 401, message: "Unauthorized access", status: "TOKEN_REQUIRED" })
        } else {
            //token extraction
            //we can get token value like Bearer sfvsfvdfsvdfbdfb so we need to split the bearer and only get code 
            token = token.split(" ").pop();

            //verify
            const data = jwt.verify(token, process.env.JWT_SECRET)

            if (data.type !== 'access') {
                next({ code: 403, message: "Token type not supported", status: "UNSUPPORTED_TOKEN" })
            }
            else {
                //  let userModel = await createUserModel(sequelize);
                const user = await authSvc.getSingleUserByFilter({ user_id: data.sub });
                req.authUser = {
                    user_id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role,
                    profile_img: user.profile_img,
                };
                next();


            }
        }

    } catch (exception) {
        if (exception instanceof jwt.TokenExpiredError) {
            next({ code: 401, status: "TOKEN_EXPIRED", message: exception.message })
        } else {
            console.log("jwtexception", exception)
            next(exception);
        }

    }

}
module.exports = {
    loginCheck
}