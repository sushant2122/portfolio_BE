const { Experience } = require("../../config/db.config");

class ExperienceService {


    createExperience = async (data) => {
        try {
            const newExperience = await Experience.create(data);
            return newExperience;
        } catch (exception) {
            throw exception;
        }
    };


    listAllByFilter = async (filter = {}) => {
        try {

            const list = await Experience.findAll({ where: filter }); // Debugging log

            return { list };
        } catch (exception) {
            throw exception;
        }
    };


    getSingleExperienceData = async (filter) => {
        try {
            const experienceDetail = await Experience.findOne({
                where: filter
            });

            if (!experienceDetail) {
                throw { code: 404, message: "Experience does not exist.", status: "EXPERIENCE_NOT_FOUND" };
            } else {
                return experienceDetail;
            }
        } catch (exception) {
            throw exception;
        }
    };

    updateExperience = async (Id, data) => {
        try {

            const experience = await Experience.findByPk(Id);

            if (!experience) {
                throw { code: 400, message: "Experience not found", status: "EXPERIENCE_NOT_FOUND" };
            }

            const updatedExperience = await experience.update(data);
            return updatedExperience;
        } catch (exception) {
            throw exception;
        }
    };

    deleteExperienceById = async (experience_id) => {
        try {
            const result = await Experience.destroy({
                where: {
                    experience_id: experience_id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Experience already deleted or does not exist.", status: "EXPERIENCE_DELETE_ERROR" };
            }

            return result;
        } catch (exception) {
            throw exception;
        }
    };
}

const experienceSvc = new ExperienceService();
module.exports = { experienceSvc };