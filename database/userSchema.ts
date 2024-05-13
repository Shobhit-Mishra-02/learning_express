import { pgTable, serial, text, varchar,PgInsertBuilder } from "drizzle-orm/pg-core";


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  salt: text('salt'),
  sessiontoken: text('sessiontoken'),
});

