const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
    try {
        var decoded = jwt.verify(req.headers.token, process.env.SECRET);
        next(decoded)
    } catch (err) {
        res.status(400).json({
            msg: "error",
            error: err
        })
    }
}

module.exports = authVerify