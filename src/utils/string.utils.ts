import express from "express";
import { randomBytes } from 'crypto'; // Para Node.js


/**
 * Generates a random string of the specified length using the provided character set.
 * @param length The length of the random string to generate.
 * @param charSet The character set to use for generating the random string. Defaults to 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.
 * @returns The randomly generated string.
 * @throws Throws an error if the length is not a positive number.
 */
 const generateRandomString = (length : number, charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  // Validación de entrada
  if (typeof length !== 'number' || length <= 0) {
    throw new Error('La longitud debe ser un número positivo.');
  }

  // Generación de bytes aleatorios (si se requiere seguridad criptográfica)
  let bytes = randomBytes(length); 

  // Conversión de bytes a caracteres
  let result = '';
  for (const byte of bytes) {
    result += charSet.charAt(byte % charSet.length);
  }

  return result;
};

export { generateRandomString };