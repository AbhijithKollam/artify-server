const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("Inside jwt Middleware");
    console.log(req.headers.authorization);
    const token = req.headers['authorization'].split(' ')[1];    //default location
    console.log(token);
    try{
        const jwtResponse = jwt.verify(token, 'supersecretkey12345')
        console.log("==jwt response===");
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next();     //mandatory

    }catch (err) {
        res.status(401).json("Authorization failed, Please Login")
    }
}
module.exports = jwtMiddleware;