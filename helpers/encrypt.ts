import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

interface IsMatchResult {
    match: boolean;
    hashedPassword: string;
}

export const isMatch = async (password: string, hashedPassword: string): Promise<IsMatchResult> => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return { match, hashedPassword };
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Error comparing passwords");
    }
};

export const generateSalt = async (): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return salt;
};

export const authentication = async (password: string, storedHashedPassword: string): Promise<boolean> => {
    try {
        const { match } = await isMatch(password, storedHashedPassword);
        return match;
    } catch (error) {
        console.error("Error authenticating password:", error);
        throw new Error("Error authenticating password");
    }
};

export const generateSessionToken = (userId: string): string => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT secret is not provided");
    }
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3600000" });
};
