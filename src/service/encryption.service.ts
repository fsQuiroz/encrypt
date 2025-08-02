import { lib, enc, SHA256, AES } from 'crypto-js';

const ivSize: number = import.meta.env.VITE_IV_SIZE;

export const encrypt: (note: string, pass: string) => string = (note: string, pass: string) => {
  // Generate encryption key from input passphrase
  const secretKey = SHA256(pass);
  // Generate initialization vector
  const iv = lib.WordArray.random(ivSize);

  // Encrypt input note
  const encryptedNote = AES.encrypt(note, secretKey, { iv: iv }).toString();

  // Package encryption information
  const pkg = {
    encrypted: encryptedNote,
    iv: enc.Base64.stringify(iv),
  };

  // Stringify and Base64 encode package
  return btoa(JSON.stringify(pkg));
};

export const decrypt: (note: string, pass: string) => string | null = (note: string, pass: string) => {
  // Parse and Base64 decode package with encryption information
  const pkg = {
    encrypted: '',
    iv: '',
  };
  try {
    const pkgTmp = JSON.parse(atob(note));
    pkg.encrypted = pkgTmp.encrypted;
    pkg.iv = pkgTmp.iv;
  } catch {
    return null;
  }

  // Generate encryption key from input passphrase
  const secretKey = SHA256(pass);
  // Get initialization vector from package
  const iv = enc.Base64.parse(pkg.iv);

  // Decrypt input note
  return AES.decrypt(pkg.encrypted, secretKey, { iv: iv }).toString(enc.Utf8);
};
