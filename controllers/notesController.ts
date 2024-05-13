import { Request, Response } from 'express';
import { 
    getNotes, 
    getNoteById, 
    createNote, 
    updateNoteById, 
    deleteNoteById 
} from '../database/noteSchema';

// Get all notes
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await getNotes();
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single note by ID
export const getNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await getNoteById(parseInt(id));
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new note
export const createNewNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const newNote = await createNote({ title, content });
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await updateNoteById(parseInt(id), {
          title, content,
          id: 0
        });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedNote = await deleteNoteById(parseInt(id));
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
