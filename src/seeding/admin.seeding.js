const bcrypt = require("bcryptjs");

async function seedAdminUser(userModel) {
    try {

        const password = bcrypt.hashSync("susadmin", 10);

        const existingAdmin = await userModel.findOne({
            where: { role: 'Admin' }
        });

        if (existingAdmin) {
            throw new Error("Admin user already exists. Seeding aborted.");
        }


        await userModel.create({
            full_name: 'Sushant Paudyal',
            email: 'sushantpaudyal@gmail.com',
            password: password,
            role: 'Admin',
            profile_img: 'https://res.cloudinary.com/dbvyoelj5/image/upload/v1740502396/khelasathi/yxsfapk54vbh42ve958b.jpg',
            date_joined: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('✅ Admin user seeded successfully!');
    } catch (error) {
        // console.error(' Error seeding admin user:', error.message);
    }
}

module.exports = { seedAdminUser };
