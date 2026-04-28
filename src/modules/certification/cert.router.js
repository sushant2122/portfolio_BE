const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { uploader, setPath } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { createCertificationDTO, updateCertificationDTO } = require("./cert.contract");
const certCtrl = require("./cert.controller");


const CertRouter = require("express").Router();

CertRouter.route('/')
    .get(certCtrl.index)
    .post(loginCheck, checkAccess('Admin'), setPath('cert'), uploader.single('cert_img'), bodyValidator(createCertificationDTO), certCtrl.store)
CertRouter.route("/:id")
    .put(loginCheck, checkAccess('Admin'), setPath('cert'), uploader.single('cert_img'), bodyValidator(updateCertificationDTO), certCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), certCtrl.remove)

module.exports = CertRouter;