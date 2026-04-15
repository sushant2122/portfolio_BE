const {
    Portfolio,
    Skill,
    Team,
    Message,

} = require("../../config/db.config");

class AdminStatsController {

    getAdminStats = async (req, res, next) => {
        try {
            // Get all stats in parallel for better performance
            const [
                totalMessages,
                unreadMessages,
                totalSkills,
                totalPortfolio,
            ] = await Promise.all([
                Message.count(),
                Message.count({ where: { is_read: false } }),
                Skill.count(),
                Portfolio.count(),

            ]);

            const stats = [
                {
                    name: 'Unread Messages',
                    value: (unreadMessages || 0).toString(),
                },
                {
                    name: 'Total Messages',
                    value: (totalMessages || 0).toString(),
                },
                {
                    name: 'Total Skills',
                    value: (totalSkills || 0).toString(),
                },
                {
                    name: 'Total Portfolio',
                    value: (totalPortfolio || 0).toString(),
                },

            ];

            res.json({
                result: stats,
                message: 'Admin statistics retrieved successfully'
            });

        } catch (error) {
            next(error);
        }
    }


    getRecentMessages = async (req, res, next) => {
        try {
            const limit = parseInt(req.query.limit) || 5;

            const recentMessages = await Message.findAll({
                attributes: [
                    'message_id',
                    'email',
                    'subject',
                    'message',
                    'is_read'
                ],
                order: [['message_id', 'DESC']],
                limit: limit
            });

            const formattedMessages = recentMessages.map(message => ({
                id: message.message_id,
                email: message.email,
                subject: message.subject || 'General Inquiry',
                message: message.message,
                is_read: message.is_read
            }));

            const unreadCount = await Message.count({ where: { is_read: false } });

            res.json({
                result: {
                    messages: formattedMessages,
                    unread_count: unreadCount
                },
                message: 'Recent messages retrieved successfully'
            });

        } catch (error) {
            console.error('Error in getRecentMessages:', error);
            next(error);
        }
    }
}

const adminStatsCtrl = new AdminStatsController();
module.exports = adminStatsCtrl;