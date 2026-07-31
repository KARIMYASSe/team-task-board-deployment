import * as bcrypt from 'bcrypt';

export const Hash = (
  plainText: string,
  saltRound: number = Number(process.env.SALTROUND),
): string => {
  return bcrypt.hashSync(plainText, saltRound);
};

export const compareHashing = (
  plainText: string,
  HashText: string,
): boolean => {
  return bcrypt.compareSync(plainText, HashText);
};
