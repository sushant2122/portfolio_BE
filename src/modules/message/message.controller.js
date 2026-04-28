const { Op } = require("sequelize");
const { messageSvc } = require("./message.service");
const { myEvent, EventName } = require("../../middleware/events.middleware");

class MessageController {

    index = async (req, res, next) => {
        try {

            const list = await messageSvc.listAllByFilter();

            res.json({
                result: list,
                meta: null,
                message: "List all messages.",
                status: "MESSAGE_LIST_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

    store = async (req, res, next) => {
        try {

            const data = req.body;

            const message = await messageSvc.createMessage(data);

            // Emit event with complete data
            myEvent.emit(EventName.CONTACT_US, {
                name: data.name,
                email: data.email,
                subject: data.subject || "General Inquiry",
                message: data.message,

            });

            res.json({
                result: {
                    message_id: message.message_id,
                    name: message.name,
                    email: message.email,
                    subject: message.subject,
                    message: message.message,
                    is_read: message.is_read,

                },
                meta: null,
                message: "Message sent successfully.",
                status: "MESSAGE_CREATION_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

    update = async (req, res, next) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const message = await messageSvc.updateMessage(id, data);
            res.json({
                result: message,
                meta: null,
                message: "Message updated successfully.",
                status: "MESSAGE_UPDATE_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };

    remove = async (req, res, next) => {
        try {
            const id = req.params.id;
            const response = await messageSvc.deleteMessageById(id);
            res.json({
                result: response,
                meta: null,
                message: "Message deleted successfully.",
                status: "MESSAGE_DELETE_SUCCESS"
            });
        } catch (exception) {
            next(exception);
        }
    };
}

const messageCtrl = new MessageController();
module.exports = { messageCtrl };