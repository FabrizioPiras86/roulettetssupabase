import { Request, Response } from 'express';
import { createUser, getUserById } from '../services/userService';
import { Users } from '../model/user';

export const addUser = async (req: Request, res: Response) => {
  try {
    const user: Users = req.body;
    const newUser = await createUser(user);
    res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
