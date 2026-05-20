const User = require("./../models/user.model");
const hashPassword = require("password-hash");
const jwt = require("jsonwebtoken");

function createToken(user) {
    let token = jwt.sign({
        full_name: user.full_name,
        email: user.email,
        _id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET)
    return token;
}

const signUp = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        if (!full_name || !email || !password) {
            return next({
                msg: "Please fill all required fields.",
                status: 400
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return next({
                msg: "User already exists.",
                status: 400
            })
        }
        const hash_password = hashPassword.generate(password);
        const newUser = await User.create({ full_name, email, password: hash_password });
        if (newUser) {
            res.json({
                msg: "Signup successfully.",
                data: newUser,
                status: 200
            })
        }
    }
    catch (err) {
        return next(err)
    }
}

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next({
                msg: "Required fields missing.",
                status: 400
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return next({
                msg: "Email not registered yet.",
                status: 400
            })
        }
        var isMatched = hashPassword.verify(password, user.password)
        if (isMatched) {
            var token = createToken(user)
            res.json({
                msg: "Logged in successfully.",
                data: user,
                token,
                status: 200
            })
        }
        else {
            return next({
                msg: "Invalid password.",
                status: 400
            })
        }
    }
    catch (err) {
        return next(err)
    }
}

module.exports = { signUp, signIn }