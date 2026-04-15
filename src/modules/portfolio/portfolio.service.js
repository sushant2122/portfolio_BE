const { Portfolio } = require("../../config/db.config");
const { uploadHelper } = require("../../utilities/helper")

class PortfolioService {
    transformPortfolioData = async (req) => {
        const data = req.body;
        if (req.file) {
            data.portfolio_img = await uploadHelper(req.file.path, 'portfolio');
        }
        else {
            delete data.portfolio_img
        }

        return data;
    }
    createPortfolio = async (data) => {
        try {
            const newPortfolio = await Portfolio.create(data);
            return newPortfolio;
        } catch (exception) {
            throw exception;
        }

    }

    listAllByFilter = async (filter = {}) => {
        try {

            const list = await Portfolio.findAll({ where: filter }); // Debugging log

            return { list };
        } catch (exception) {
            throw exception;
        }
    };


    getSingleData = async (filter) => {
        try {
            const portfolioDetail = await Portfolio.findOne({
                where: filter
            });

            if (!portfolioDetail) {
                throw ({ code: 404, message: "Portfolio does not exists.", status: "PORTFOLIO_NOT_FOUND" });
            } else {
                return portfolioDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updatePortfolio = async (Id, data) => {
        try {

            const portfolio = await Portfolio.findByPk(Id);

            if (!portfolio) {
                throw { code: 400, message: "Portfolio not found", status: "PORTFOLIO_NOT_FOUND" };
            }


            const updatedPortfolio = await portfolio.update(data);

            return updatedPortfolio;

        } catch (exception) {
            throw exception;
        }
    }
    deletePortfolioById = async (portfolio_id) => {

        try {
            const result = await Portfolio.destroy({
                where: {
                    portfolio_id: portfolio_id // Specify the ID of the banner to delete
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Portfolio already deleted or does not exists.", status: "PORTFOLIO_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const portfolioSvc = new PortfolioService();
module.exports = { portfolioSvc };