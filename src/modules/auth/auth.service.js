
const { User } = require("../../config/db.config");

class AuthService {


    getSingleUserByFilter = async (filter) => {
        try {
            const user = await User.findOne({
                where: filter
            });

            if (!user) {
                throw ({ code: 400, message: "User not found", status: "USER_NOT_FOUND" })
            } else {
                return user;
            }

        } catch (exception) {
            throw exception;

        }
    }

    updateUserById = async (filter, data) => {
        try {
            // Find the user by the given ID
            const user = await User.findOne({
                where: filter
            });
            // If user is not found, throw an error
            if (!user) {
                throw ({ code: 404, message: "User not found", status: "USER_NOT_FOUND" });
            }

            // Update the user's details with the provided data
            const updatedUser = await user.update(data);

            return updatedUser;

        } catch (exception) {
            throw exception;
        }
    }


}
const authSvc = new AuthService();
module.exports = {
    authSvc
}