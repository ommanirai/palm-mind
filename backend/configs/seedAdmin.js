const User = require("./../models/user.model");
const hashPassword = require("password-hash")

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({
            email: "admin@gmail.com"
        });

        if (adminExists) {
            console.log("Admin already exists");
            return;
        }

        const hash_password = hashPassword.generate("admin");

        await User.create({
            full_name: "Admin",
            email: "admin@gmail.com",
            password: hash_password,
            role: "admin"
        });

        console.log("Default admin created");

    } catch (error) {
        console.log("Admin seed error:", error);
    }
};

module.exports = seedAdmin;