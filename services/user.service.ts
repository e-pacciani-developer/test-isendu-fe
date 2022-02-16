import axios from 'axios';
import { User } from '../models/user';

export const usersService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

/**
 * Makes a call to the API for retriving all the users, optionally using a name filter
 * @param nameFilter The name filter to use
 * @returns A list of users
 */
async function getAllUsers(nameFilter?: string): Promise<User[]> {
  const response = await axios.get<User[]>(`http://localhost:5000/api/users`, {
    params: nameFilter ? { name: nameFilter } : {},
  });
  const users = await response.data;

  return users;
}

/**
 * Makes a call to the API for retriving a single user by its id
 * @param id The id of the user to retrieve
 * @returns A user if found, an error otherwise
 */
async function getUserById(id: string): Promise<User> {
  const response = await axios.get<User>(
    `http://localhost:5000/api/users/${id}`
  );
  const user = await response.data;

  return user;
}

/**
 * Makes a call to the API for creating a new user
 * @param userData The data of the user to create
 * @returns The user created if the call was successful, an error otherwise
 */
async function createUser(userData: User): Promise<User> {
  const response = await axios.post<User>(
    'http://localhost:5000/api/users',
    userData
  );
  const user = await response.data;

  return user;
}

/**
 * Makes a call to the API for updating a user
 * @param userData The data of the user to update
 * @returns The updated user if the call was successful, an error otherwise
 */
async function updateUser(userData: User): Promise<User> {
  const response = await axios.put<User>(
    `http://localhost:5000/api/users/${userData.id}`,
    userData
  );
  const user = await response.data;

  return user;
}

/**
 * Makes a call to the API for deleting a user and all the appointments related to it
 * @param id The id of the user to delete
 * @returns True if the user was deleted, an error otherwise
 */
async function deleteUser(id: string): Promise<boolean> {
  const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
  const data = await response.data;

  return data;
}
