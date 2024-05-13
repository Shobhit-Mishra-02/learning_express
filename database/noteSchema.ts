import { db } from "./connection";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";


// Define the notes schema
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
});

// CRUD operations for notes
export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NewNote {
  title: string;
  content: string;
}

export const getNotes = async () =>
  await db
    .select({ id: notes.id, title: notes.title, content: notes.content })
    .from(notes);

export const getNoteById = async (id: number) =>
  await db
    .select()
    .from(notes)
    .where(eq(notes.id, id));

export const createNote = async (newNote: NewNote) =>
  await db
    .insert(notes)
    .values(newNote)
    .returning({ id: notes.id, title: notes.title, content: notes.content });

export const updateNoteById = async (id: number, updatedNote: Note) =>
  await db
    .update(notes)
    .set(updatedNote)
    .where(eq(notes.id, id))
    .returning({ id: notes.id, title: notes.title, content: notes.content });

export const deleteNoteById = async (id: number) =>
  await db
    .delete(notes)
    .where(eq(notes.id, id));
