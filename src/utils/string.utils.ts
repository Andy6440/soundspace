import express from "express";
import { randomBytes } from 'crypto'; // Para Node.js

/**
 * Genera una cadena aleatoria de la longitud especificada, utilizando caracteres alfanuméricos.
 * Si se requiere seguridad criptográfica, utiliza bytes aleatorios seguros.
 *
 * @param {number} length - La longitud deseada de la cadena aleatoria.
 * @param {string} [charSet] - (Opcional) El conjunto de caracteres a utilizar. Por defecto, incluye letras mayúsculas y minúsculas, y números.
 * @returns {string} La cadena aleatoria generada.
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