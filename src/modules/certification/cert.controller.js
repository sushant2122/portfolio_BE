const { fileDelete } = require("../../utilities/helper");
const { certSvc } = require("./cert.service");

class CertController {

    index = async (req, res, next) => {
        try {

            // Fetch the list of courts based on the filter
            const { list } = await certSvc.listAllByFilter();

            res.json({
                result: list,
                meta: null,
                message: "List all certifications.",
                status: "CERT_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };


    store = async (req, res, next) => {
        try {
            const data = await certSvc.transformCertData(req);
            const cert = await certSvc.createCert(data);
            res.json({
                result: cert,
                meta: null,
                message: "Certification created successfully.",
                status: "CERT_CREATION_SUCCESS"
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

            const cert_id = req.params.id;
            const data = await certSvc.transformCertData(req);
            const cert = await certSvc.updateCert(cert_id, data);
            res.json({
                result: cert,
                meta: null,
                message: "Certification updated successfully.",
                status: "CERT_UPDATE_SUCCESS"
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
            const response = await certSvc.deleteCertById(id);
            res.json({
                result: response,
                meta: null,
                message: "Certification deleted successfully.",
                status: "CERT_DELETE_SUCCESS"
            });

        } catch (exception) {
            next(exception)
        }
    }

}
const certCtrl = new CertController();

module.exports = certCtrl;