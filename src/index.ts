import express from 'express';
import { addUser, getUser } from './controllers/userController';
import { addGame, listGames } from './controllers/gameController';
import { addShot, stopGame } from './controllers/shotController';

const app = express();
app.use(express.json());

app.post('/api/users/create', addUser);
app.get('/api/users/:id', getUser);

app.post('/api/games/create', addGame);
app.get('/api/games/user/:userId', listGames);

app.post('/api/shots/game/:gameId/create', addShot);
app.post('/api/shots/game/:gameId/stop', stopGame);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
