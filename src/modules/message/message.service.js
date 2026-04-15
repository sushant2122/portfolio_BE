const { Message } = require("../../config/db.config");

class MessageService {


    createMessage = async (data) => {
        try {
            const newMessage = await Message.create(data);
            return newMessage;
        } catch (exception) {
            throw exception;
        }
    };

    listAllByFilter = async (filter = {}) => {
        try {

            const list = await Message.findAll({
                where: filter,

            });

            return list;
        } catch (exception) {
            throw exception;
        }
    };

    getSingleMessageData = async (filter) => {
        try {
            const MessageDetail = await Message.findOne({
                where: filter
            });

            if (!MessageDetail) {
                throw { code: 404, message: "Message does not exist.", status: "MESSAGE_NOT_FOUND" };
            } else {
                return MessageDetail;
            }
        } catch (exception) {
            throw exception;
        }
    };

    updateMessage = async (Id, data) => {
        try {

            const message = await Message.findByPk(Id);

            if (!message) {
                throw { code: 400, message: "Message not found", status: "MESSAGE_NOT_FOUND" };
            }

            const updatedMessage = await message.update(data);
            return updatedMessage;
        } catch (exception) {
            throw exception;
        }
    };

    deleteMessageById = async (message_id) => {
        try {
            const result = await Message.destroy({
                where: {
                    message_id: message_id
                }
            });

            if (result === 0) {
                throw { code: 404, message: "Message already deleted or does not exist.", status: "MESSAGE_DELETE_ERROR" };
            }

            return result;
        } catch (exception) {
            throw exception;
        }
    };
}

const messageSvc = new MessageService();
module.exports = { messageSvc };