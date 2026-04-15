const { Skill } = require("../../config/db.config");
const { uploadHelper } = require("../../utilities/helper")

class SkillService {
    transformSkillData = async (req) => {
        const data = req.body;
        if (req.file) {
            data.skill_img = await uploadHelper(req.file.path, 'skill');
        }
        else {
            delete data.skill_img
        }

        return data;
    }
    createSkill = async (data) => {
        try {
            const newSkill = await Skill.create(data);
            return newSkill;
        } catch (exception) {
            throw exception;
        }

    }

    listAllByFilter = async (filter = {}) => {
        try {

            const list = await Skill.findAll({ where: filter }); // Debugging log

            return { list };
        } catch (exception) {
            throw exception;
        }
    };


    getSingleData = async (filter) => {
        try {
            const skillDetail = await Skill.findOne({
                where: filter
            });

            if (!skillDetail) {
                throw ({ code: 404, message: "Skill does not exists.", status: "SKILL_NOT_FOUND" });
            } else {
                return skillDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updateSkill = async (Id, data) => {
        try {

            const skill = await Skill.findByPk(Id);

            if (!skill) {
                throw { code: 400, message: "Skill not found", status: "SKILL_NOT_FOUND" };
            }


            const updatedSkill = await skill.update(data);

            return updatedSkill;

        } catch (exception) {
            throw exception;
        }
    }
    deleteSkillById = async (skill_id) => {

        try {
            const result = await Skill.destroy({
                where: {
                    skill_id: skill_id // Specify the ID of the banner to delete
                }
            });

            if (result === 0) {
                throw { code: 404, message: "SKill already deleted or does not exists.", status: "SKILL_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const skillSvc = new SkillService();
module.exports = { skillSvc };