const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(' ');
    if(!token || token[0]!="Bearer"){
        return res.status(404).json({
            message: 'No token provided',
        })
    }
    try
    {
        const decodedToken = jwt.verify(token[1], JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({
                message:"Unauthorized",
            })
        }
        req.userName = decodedToken.userName;
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

module.exports = {
    authMiddleware,
}