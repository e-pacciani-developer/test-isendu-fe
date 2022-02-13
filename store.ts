import { atom } from 'jotai';
import { User } from './models/user';

export const currentUserAtom = atom<User | null>(null);
