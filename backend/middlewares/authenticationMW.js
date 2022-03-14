const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({success: false, message: "Error: 401 Not Authorized"})
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({success: false, message: "Error: 401 Not Authorized"})
    }

}