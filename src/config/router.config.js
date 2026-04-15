const router = require('express').Router();

const AdminStatRouter = require('../modules/admin-stats/admin-stat.router');
const authRouter = require("../modules/auth/auth.router");  // This is your authRouter
const MessageRouter = require('../modules/message/message.router');

const ExperienceRouter = require('../modules/experience/experience.router');
const SkillRouter = require('../modules/skill/skill.router');
const PortfolioRouter = require('../modules/portfolio/portfolio.router');


// Route for checking health status
router.use("/health", (req, res) => {
    res.end("This is success.");
});
//mounting all the routes from here 
router.use('/auth', authRouter);
router.use('/message', MessageRouter);
router.use('/experience', ExperienceRouter);
router.use('/portfolio', PortfolioRouter);
router.use('/skill', SkillRouter);


router.use('/stat', AdminStatRouter);

// Default route used to check if the api is correct or not 
router.use("/", (req, res) => {
    res.send("Hello world");
});

module.exports = router;
