const User = require("../models/user.model");

const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, { email: 1, full_name: 1 })
        if (!user) {
            return next({
                msg: "User not found.",
                status: 400
            })
        }
        res.json({
            data: user,
            status: 200
        })
    }
    catch (err) {
        return next(err)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find({}, { email: 1, full_name: 1 });
        if (!user.length) {
            return next({
                msg: "No users found.",
                status: 400
            })
        }
        res.json({
            data: user,
            status: 200
        })
    }
    catch (err) {
        return next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { full_name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { full_name, email }, { new: true })
        if (!updatedUser) {
            return next({
                msg: "User not found.",
                status: 400
            })
        }
        res.json({
            msg: "User updated successfully.",
            data: updatedUser,
            status: 200
        })
    }
    catch (err) {
        return next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return next({
                msg: "User not found.",
                status: 400
            })
        }
        res.json({
            msg: "User deleted successfully.",
            status: 200
        })
    }
    catch (err) {
        return next(err)
    }
}

module.exports = { getAllUser, getSingleUser, updateUser, deleteUser }