const JWT_SECRET = require("./config")
const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({
            msg: console.log(authHeader)
        })
    }
    else {
        const token = authHeader.split(' ')[1]

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET)

            if (decodedToken.userId) {
                req.userId = decodedToken.userId,
                    next()
            }
            else {
                return res.status(403).json({})
            }
        }
        catch (err) {
            return res.status(403).json({
                msg: err
            })
        }
    }
}

module.exports = authMiddleware