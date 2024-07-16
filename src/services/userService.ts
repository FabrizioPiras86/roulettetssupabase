import { Users } from '../model/user';
import { supabase } from '../supabaseClient';

export const createUser = async (user: Users): Promise<Users | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select('*'); 

  if (error) {
    console.error('Supabase Error:', error.message);
    throw new Error(error.message);
  }

  console.log('Supabase Response:', data); 
  return data ? data[0] : null;
};

export const updateUser = async (user: Users): Promise<void> => {
  if (!user.id) {
    throw new Error('User ID is required for update');
  }

  const { error } = await supabase
    .from('users')
    .update(user)
    .eq('id', user.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id: number): Promise<Users | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
