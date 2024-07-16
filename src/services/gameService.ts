import { Game } from '../model/game';
import { supabase } from '../supabaseClient';

export const createGame = async (game: Game): Promise<Game> => {
  const { data, error } = await supabase
    .from('games')
    .insert(game)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getGamesByUserId = async (userId: number): Promise<Game[]> => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const getGameById = async (id: number): Promise<Game | null> => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateGame = async (game: Game): Promise<void> => {
  if (!game.id) {
    throw new Error('Game ID is required for update');
  }

  const { error } = await supabase
    .from('games')
    .update(game)
    .eq('id', game.id);

  if (error) {
    throw error;
  }
};
