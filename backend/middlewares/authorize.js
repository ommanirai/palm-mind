module.exports = function (...roles) {
    return function (req, res, next) {
        try {
            const user = req.loggedInUser;
            if (!user) {
                return next({
                    msg: "Unauthorized.",
                    status: 401
                })
            }
            if (!roles.includes(user.role)) {
                return next({
                    msg: "Permission denied.",
                    status: 403
                })
            }
            next();
        }
        catch (err) {
            return next(err);
        }
    }
}