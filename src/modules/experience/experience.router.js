
const { checkAccess } = require("../../middleware/rbac.middleware");
const { loginCheck } = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { experienceCtrl } = require("./experience.controller");
const { createExperienceDTO, updateExperienceDTO } = require("./experience.contract");

const ExperienceRouter = require("express").Router();

// Routes for CRUD operations on courts
ExperienceRouter.route('/')
    .get(experienceCtrl.index)
    .post(loginCheck, checkAccess('Admin'), bodyValidator(createExperienceDTO), experienceCtrl.store);

ExperienceRouter.route("/:id")
    .put(loginCheck, checkAccess('Admin'), bodyValidator(updateExperienceDTO), experienceCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), experienceCtrl.remove);

module.exports = ExperienceRouter;