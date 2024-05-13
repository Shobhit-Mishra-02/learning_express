import { db } from "../database/connection";
import { users } from "../database/userSchema";
import { eq } from "drizzle-orm";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  salt?: string;
  sessiontoken?: string;
}

export interface NewUser {
  username: string;
  email: string;
  password: string;
}

export const getUsers = async () =>
  await db
    .select({ id: users.id, username: users.username, email: users.email })
    .from(users);
export const getUserByEmail = async (email: string) =>
  await db.select().from(users).where(eq(users.email, email));
export const getUserBySessionToken = async (sessionToken: string) =>
  await db.select().from(users).where(eq(users.sessiontoken, sessionToken));
export const createUser = async (newUser: NewUser) =>
  await db
    .insert(users)
    .values(newUser)
    .returning({ id: users.id, username: users.username, email: users.email });
export const updateUserById = async (id: number, updatedUser: User) =>
  await db
    .update(users)
    .set(updatedUser)
    .where(eq(users.id, id))
    .returning({ id: users.id, username: users.username, email: users.email });
