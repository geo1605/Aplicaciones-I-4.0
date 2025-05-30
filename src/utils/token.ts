import jwt from "jsonwebtoken";
const ACCESS_SECRET = "secret12345";

export const accessGenToken = (userId: string) => jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: "15m"
        }
    );
export const accessVerifyToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET) as { userId: string };
};
