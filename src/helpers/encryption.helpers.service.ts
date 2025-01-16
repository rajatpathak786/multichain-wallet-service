import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export const encrypt = async (privateKey: string) => {
  const iv = randomBytes(16); // Generate a random IV
  // Generate a key using scrypt
  const key = await getEncryptionKey();

  // Encryption
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.concat([
    cipher.update(privateKey, 'utf8'),
    cipher.final(),
  ]);
  const ivAndCipherText = Buffer.concat([iv, encryptedText]);
  return ivAndCipherText.toString('hex');
};

export const decrypt = async (keyHashReceived: string): Promise<string> => {
  const key = await getEncryptionKey();

  //KeyHashReceived
  const bufferKey = Buffer.from(keyHashReceived, 'hex');
  const ivKey = bufferKey.subarray(0, 16);
  const encryptedText = bufferKey.subarray(16);

  // Decryption (using the same key and IV)
  const decipher = createDecipheriv('aes-256-ctr', key, ivKey);
  const decryptedTextKey = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decryptedTextKey.toString();
};

export const generateHash = async (privateKey: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(privateKey, saltOrRounds);
};

export const checkKeyMatch = async (
  recievedHash: string,
  dbHash: string,
): Promise<boolean> => {
  const decryptHash = await decrypt(recievedHash);
  return await bcrypt.compare(decryptHash, dbHash);
};

export const uint8ArrayToBase64 = (arr: Uint8Array): string => {
  return btoa(String.fromCharCode(...arr));
};

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  return new Uint8Array(
    binaryString.split('').map((char) => char.charCodeAt(0)),
  );
};

const getEncryptionKey = async (): Promise<Buffer> => {
  const configService = new ConfigService();
  const passwordKey = configService.get<string>('ENCRYPTION_KEY');
  // Generate a key using scrypt
  return (await promisify(scrypt)(passwordKey, 'salt', 32)) as Buffer;
};
