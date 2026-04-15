const { fileDelete } = require("../../utilities/helper");
const { skillSvc } = require("./skill.service");
class SkillController {

    index = async (req, res, next) => {
        try {

            // Fetch the list of courts based on the filter
            const { list } = await skillSvc.listAllByFilter();

            res.json({
                result: list,
                meta: null,
                message: "List all skills.",
                status: "SKILL_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };


    store = async (req, res, next) => {
        try {
            const data = await skillSvc.transformSkillData(req);
            const skill = await skillSvc.createSkill(data);
            res.json({
                result: skill,
                meta: null,
                message: "Skill created successfully.",
                status: "SKILL_CREATION_SUCCESS"
            });

        } catch (exception) {
            next(exception)

        } finally {
            if (req.file) {
                try {
                    await fileDelete(req.file.path);
                } catch (err) {
                    console.log("File delete error:", err.message);
                }
            }
        }
    }


    update = async (req, res, next) => {
        try {

            const skill_id = req.params.id;
            const data = await skillSvc.transformSkillData(req);
            const skill = await skillSvc.updateSkill(skill_id, data);
            res.json({
                result: skill,
                meta: null,
                message: "Skill updated successfully.",
                status: "SKILL_UPDATE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        } finally {
            if (req.file) {
                fileDelete(req.file.path);
            }
        }
    }

    remove = async (req, res, next) => {
        try {
            const id = req.params.id;
            const response = await skillSvc.deleteSkillById(id);
            res.json({
                result: response,
                meta: null,
                message: "Skill deleted successfully.",
                status: "SKILL_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const skillCtrl = new SkillController();

module.exports = skillCtrl;