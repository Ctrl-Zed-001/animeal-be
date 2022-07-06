const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1]
        var decoded = jwt.verify(token, process.env.SECRET);
        res.authUser = decoded
        next()
    } catch (err) {
        res.status(400).json({
            msg: "auth error",
            error: err
        })
    }
}

module.exports = authVerify