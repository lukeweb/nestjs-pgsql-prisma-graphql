import { ulid } from 'ulid';
import { genSalt, hashSync } from 'bcrypt';

export const generateUlidId = (): string => ulid();

export const createBcryptHash = async (
  word: string,
  saltRounds: number = 16,
): Promise<string> => {
  return hashSync(word, await genSalt(saltRounds));
};
