import { Shot } from '../model/shot';
import { supabase } from '../supabaseClient';

export const createShot = async (shot: Shot): Promise<Shot> => {
  const { data, error } = await supabase
    .from('shots')
    .insert(shot)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getShotsByGameId = async (gameId: number): Promise<Shot[]> => {
  const { data, error } = await supabase
    .from('shots')
    .select('*')
    .eq('game_id', gameId);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};
