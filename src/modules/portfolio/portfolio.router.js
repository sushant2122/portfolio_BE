const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const { uploader, setPath } = require("../../middleware/uploader.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");
const { createPortfolioDTO, updatePortfolioDTO } = require("./portfolio.contract");
const portfolioCtrl = require("./portfolio.controller");


const PortfolioRouter = require("express").Router();

PortfolioRouter.route('/')
    .get(portfolioCtrl.index)
    .post(loginCheck, checkAccess('Admin'), setPath('portfolio'), uploader.single('portfolio_img'), bodyValidator(createPortfolioDTO), portfolioCtrl.store)
PortfolioRouter.route("/:id")
    .put(loginCheck, checkAccess('Admin'), setPath('portfolio'), uploader.single('portfolio_img'), bodyValidator(updatePortfolioDTO), portfolioCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), portfolioCtrl.remove)

module.exports = PortfolioRouter;