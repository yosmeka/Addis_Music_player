import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
    console.log(user)
    const accessToken = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_REFRESH_TOKEN);
    return {
        accessToken,
        refreshToken
    }
}

export const refresh = (data) => {
    console.log(data)
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30m' });
    return accessToken;
}
