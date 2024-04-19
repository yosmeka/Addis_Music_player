import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export const verifyToken = (req, res, next) => {

    try{
        const token = req.headers.authorization.split(' ')[1];
        
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = decoded.user;
            req.role = decoded.role;
            next();
        });
    } catch(error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};