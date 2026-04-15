
const { experienceSvc } = require("./experience.service");


class ExperienceController {

    index = async (req, res, next) => {
        try {

            // Fetch the list of courts based on the filter
            const { list } = await experienceSvc.listAllByFilter();

            res.json({
                result: list,
                meta: null,
                message: "List all experiences.",
                status: "EXPERIENCE_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

    store = async (req, res, next) => {
        try {
            const data = req.body;
            const experience = await experienceSvc.createExperience(data);
            res.json({
                result: experience,
                meta: null,
                message: "Experience created successfully.",
                status: "EXPERIENCE_CREATION_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };
    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const experience = await experienceSvc.updateExperience(id, data);
            res.json({
                result: experience,
                meta: null,
                message: "Experience updated successfully.",
                status: "EXPERIENCE_UPDATE_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

    remove = async (req, res, next) => {
        try {
            const id = req.params.id;
            const response = await experienceSvc.deleteExperienceById(id);
            res.json({
                result: response,
                meta: null,
                message: "Experience deleted successfully.",
                status: "EXPERIENCE_DELETE_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

}

const experienceCtrl = new ExperienceController();
module.exports = { experienceCtrl };