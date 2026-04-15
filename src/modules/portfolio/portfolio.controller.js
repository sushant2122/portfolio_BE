const { fileDelete } = require("../../utilities/helper");
const { portfolioSvc } = require("./portfolio.service");
class PortfolioController {

    index = async (req, res, next) => {
        try {

            // Fetch the list of courts based on the filter
            const { list } = await portfolioSvc.listAllByFilter();

            res.json({
                result: list,
                meta: null,
                message: "List all portfolios.",
                status: "PORTFOLIO_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };


    store = async (req, res, next) => {
        try {
            const data = await portfolioSvc.transformPortfolioData(req);
            const portfolio = await portfolioSvc.createPortfolio(data);
            res.json({
                result: portfolio,
                meta: null,
                message: "Portfolio created successfully.",
                status: "PORTFOLIO_CREATION_SUCCESS"
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

            const portfolio_id = req.params.id;
            const data = await portfolioSvc.transformPortfolioData(req);
            const portfolio = await portfolioSvc.updatePortfolio(portfolio_id, data);
            res.json({
                result: portfolio,
                meta: null,
                message: "Portfolio updated successfully.",
                status: "PORTFOLIO_UPDATE_SUCCESS"
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
            const response = await portfolioSvc.deletePortfolioById(id);
            res.json({
                result: response,
                meta: null,
                message: "Portfolio deleted successfully.",
                status: "PORTFOLIO_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const portfolioCtrl = new PortfolioController();

module.exports = portfolioCtrl;