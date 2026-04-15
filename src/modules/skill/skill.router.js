const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { uploader, setPath } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { createSkillDTO, updateSkillDTO } = require("./skill.contract");
const skillCtrl = require("./skill.controller");


const SkillRouter = require("express").Router();

SkillRouter.route('/')
    .get(skillCtrl.index)
    .post(loginCheck, checkAccess('Admin'), setPath('skill'), uploader.single('skill_img'), bodyValidator(createSkillDTO), skillCtrl.store)
SkillRouter.route("/:id")
    .put(loginCheck, checkAccess('Admin'), setPath('skill'), uploader.single('skill_img'), bodyValidator(updateSkillDTO), skillCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), skillCtrl.remove)

module.exports = SkillRouter;