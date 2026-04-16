const { checkAccess } = require("../../middleware/rbac.middleware");
const { loginCheck } = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/validator.middleware");

const { messageCtrl } = require("./message.controller");
const { createMessageDTO, updateMessageDTO } = require("./message.contract");

const rateLimit = require('express-rate-limit');

const messageLimiter = rateLimit(
    {
        windowMs: 30 * 60 * 1000, // 30 minutes
        max: 3, // Limit each IP to 3 requests per windowMs
        message: {
            status: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests. Please try again later."
        }
    }
);

const MessageRouter = require("express").Router();

// Routes for CRUD operations on messages
MessageRouter.route('/')
    .get(loginCheck, checkAccess('Admin'), messageCtrl.index)
    .post(messageLimiter, bodyValidator(createMessageDTO), messageCtrl.store                 // Finally create message
    );

MessageRouter.route("/:id")
    .put(loginCheck, checkAccess('Admin'), bodyValidator(updateMessageDTO), messageCtrl.update)
    .delete(loginCheck, checkAccess('Admin'), messageCtrl.remove);

module.exports = MessageRouter;