const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

function authorizeAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
console.log(token);
    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        if (decoded.role !== 'admin') {
            return res.status(403).send('Unauthorized');
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    authorizeAdmin,
};
