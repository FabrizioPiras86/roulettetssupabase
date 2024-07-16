import { Request, Response } from 'express';
import { createGame, getGamesByUserId } from '../services/gameService';
import { Game } from '../model/game';

export const addGame = async (req: Request, res: Response) => {
  try {
    const { user, betAmount, won } = req.body;
    const game: Game = {
      user_id: user.id,
      bet_amount: betAmount,
      won,
      active: true,
    };
    const newGame = await createGame(game);
    res.json(newGame);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const listGames = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const games = await getGamesByUserId(Number(userId));
    res.json(games);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
