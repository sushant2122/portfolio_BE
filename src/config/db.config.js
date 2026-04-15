
const { Sequelize } = require("sequelize");
const { createUserModel } = require("../modules/user/user.model");
const { seedAdminUser } = require("../seeding/admin.seeding");

const { createMessageModel } = require("../modules/message/message.model");
const { createSkillModel } = require("../modules/skill/skill.model");
const { createExperienceModel } = require("../modules/experience/experience.model");
const { createPortfolioModel } = require("../modules/portfolio/portfolio.model");

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT,
        logging: false,  // Disable logging for cleaner console output
    }
);

const User = createUserModel(sequelize);


const Experience = createExperienceModel(sequelize);
const Portfolio = createPortfolioModel(sequelize);

const Message = createMessageModel(sequelize);


const Skill = createSkillModel(sequelize);


//initializing the database 
const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to PostgreSQL database.");

        // Sync database
        await sequelize.sync({ alter: true });

        await seedAdminUser(User);

        console.log("✅ Database synced and seeded.");
    } catch (error) {
        console.error("❌ Error connecting to PostgreSQL database:", error);
    }
};

initDb();


module.exports = {
    sequelize,
    User,
    Portfolio,
    Skill,
    Message,
    Experience


};
