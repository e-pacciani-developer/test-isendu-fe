import axios from 'axios';
import { User } from '../models/user';

export const usersService = {
  getAllUsers,
  getUserById,
  createUser,
};

async function getAllUsers(): Promise<User[]> {
  const response = await axios.get<User[]>('http://localhost:5000/api/users');
  const users = await response.data;

  return users;
}

async function getUserById(id: string): Promise<User> {
  const response = await axios.get<User>(
    `http://localhost:5000/api/users/${id}`
  );
  const user = await response.data;

  return user;
}

async function createUser(userData: User): Promise<User> {
  const response = await axios.post<User>(
    'http://localhost:5000/api/users',
    userData
  );
  const user = await response.data;

  return user;
}
