const { loginCheck } = require("../../middleware/auth.middleware");
const { checkAccess } = require("../../middleware/rbac.middleware");
const adminStatsCtrl = require("./admin-stat.controller");


const AdminStatRouter = require("express").Router();
// Dashboard stats
AdminStatRouter.get('/', loginCheck, checkAccess('Admin'), adminStatsCtrl.getAdminStats);

// Message routes
AdminStatRouter.get('/messages/recent', loginCheck, checkAccess('Admin'), adminStatsCtrl.getRecentMessages);

module.exports = AdminStatRouter;

