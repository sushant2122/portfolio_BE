const { Cert } = require("../../config/db.config");
const { uploadHelper } = require("../../utilities/helper")

class CertService {
    transformCertData = async (req) => {
        const data = req.body;
        if (req.file) {
            data.cert_img = await uploadHelper(req.file.path, 'cert');
        }
        else {
            delete data.cert_img
        }

        return data;
    }
    createCert = async (data) => {
        try {
            const newCert = await Cert.create(data);
            return newCert;
        } catch (exception) {
            throw exception;
        }

    }

    listAllByFilter = async (filter = {}) => {
        try {

            const list = await Cert.findAll({ where: filter }); // Debugging log

            return { list };
        } catch (exception) {
            throw exception;
        }
    };


    getSingleData = async (filter) => {
        try {
            const certlDetail = await Cert.findOne({
                where: filter
            });

            if (!certlDetail) {
                throw ({ code: 404, message: "Certifications does not exists.", status: "CERTIFICATION_NOT_FOUND" });
            } else {
                return certlDetail;
            }

        } catch (exception) {
            throw exception;
        }
    }
    updateCert = async (Id, data) => {
        try {

            const cert = await Cert.findByPk(Id);

            if (!cert) {
                throw { code: 400, message: "Certification not found", status: "CERTIFICATION_NOT_FOUND" };
            }


            const updatedCert = await cert.update(data);

            return updatedCert;

        } catch (exception) {
            throw exception;
        }
    }
    deleteCertById = async (cert_id) => {

        try {
            const result = await Cert.destroy({
                where: {
                    cert_id: cert_id // Specify the ID of the banner to delete
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Certification already deleted or does not exists.", status: "CERT_DELETE_ERROR" };
            }

            return result;

        } catch (exception) {
            throw exception;
        }
    };
}
const certSvc = new CertService();
module.exports = { certSvc };