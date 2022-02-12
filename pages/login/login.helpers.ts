import axios from 'axios';
import { User } from '../../models/user';

export async function getAllUsers(): Promise<User[]> {
  const response = await axios.get<User[]>('http://localhost:5000/api/users');
  const users = await response.data;

  return users;
}
