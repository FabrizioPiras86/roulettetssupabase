import { Request, Response } from 'express';
import { createShot, getShotsByGameId } from '../services/shotService';
import { Shot } from '../model/shot';
import { getGameById, updateGame } from '../services/gameService';
import { getUserById, updateUser } from '../services/userService';

export const addShot = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const shot: Shot = req.body;
    const shots = await getShotsByGameId(Number(gameId));

    if (shots.length >= 5) {
      return res.status(400).json({ error: 'Maximum 5 shots allowed per game' });
    }

    const game = await getGameById(Number(gameId));
    if (!game || !game.active) {
      return res.status(400).json({ error: 'Game is not active or does not exist' });
    }

    const user = await getUserById(game.user_id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    shot.game_id = Number(gameId);
    shot.shot_number = shots.length + 1;
    shot.hit = Math.random() < 0.25; // 25% probability to hit the bullet

    if (shot.hit) {
      user.balance -= game.bet_amount;
      game.active = false;
      await updateUser(user);
      await updateGame(game);
    } else {
      if (typeof game.bet_amount !== 'undefined') {
        game.bet_amount *= 1.25;
      } else {
        return res.status(400).json({ error: 'Bet amount is undefined' });
      }

      if (shots.length === 4) { // If this is the last shot (5th shot)
        user.balance += game.bet_amount;
        game.active = false;
        await updateUser(user);
        await updateGame(game);
      } else {
        await updateGame(game);
      }
    }

    const newShot = await createShot(shot);
    res.json(newShot);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const stopGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const game = await getGameById(Number(gameId));

    if (!game || !game.active) {
      return res.status(400).json({ error: 'Game is not active or does not exist' });
    }

    game.active = false;

    if (game.won) {
      console.log('Game is already won.');
      return res.status(400).json({ error: 'Game is already won.' });
    }

    game.won = true;

    const user = await getUserById(game.user_id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    user.balance += game.bet_amount;

    await updateUser(user);
    await updateGame(game);

    res.status(204).send();
  } catch (error) {
    console.error('Error stopping game:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

