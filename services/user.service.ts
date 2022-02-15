import axios from 'axios';
import { User } from '../models/user';

export const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

async function getAllUsers(nameFilter?: string): Promise<User[]> {
  const response = await axios.get<User[]>(`http://localhost:5000/api/users`, {
    params: nameFilter ? { name: nameFilter } : {},
  });
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

async function updateUser(userData: User): Promise<User> {
  const response = await axios.put<User>(
    `http://localhost:5000/api/users/${userData.id}`,
    userData
  );
  const user = await response.data;

  return user;
}

async function deleteUser(id: string): Promise<boolean> {
  const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
  const data = await response.data;

  return data;
}
