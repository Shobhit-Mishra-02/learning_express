import express from 'express';
import { createUser, getUserByEmail, updateUserById } from './userController';
import { generateSalt, generateSessionToken, authentication } from '../helpers/encrypt';
import bcrypt from 'bcryptjs';

export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.sendStatus(400);
        }

        const result = await getUserByEmail(email);

        if (result && result.length > 0) {
            return res.sendStatus(400);
        }

        const salt = await generateSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await createUser({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(200).json(user).end();
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const result = await getUserByEmail(email);

        if (!result || result.length === 0) {
            return res.sendStatus(400);
        }

        const user = result[0];

        // Authenticate the user's password
        const isPasswordValid = await authentication(password, user.password);

        if (!isPasswordValid) {
            return res.sendStatus(403);
        }

        // Generate session token
        const sessionToken = generateSessionToken(user.id.toString());

        // Update user's session token in the database
        user.sessiontoken = sessionToken;
        await updateUserSessionToken(user.id, sessionToken);

        // Set session token cookie
        res.cookie('sessionToken', sessionToken, { maxAge: 900000, httpOnly: true });

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.sendStatus(500);
    }
};

const updateUserSessionToken = async (userId: number, sessionToken: string) => {
    try {
        // Implement the logic to update the user's session token in the database
    } catch (error) {
        console.error('Error updating user session token:', error);
        throw error;
    }
};
