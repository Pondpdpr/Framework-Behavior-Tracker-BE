import { AES, enc } from 'crypto-js';

class TokenDto {
  userId: number;

  formId: number;
}

export const encryptToken = (data: TokenDto) =>
  encodeURIComponent(
    AES.encrypt(JSON.stringify(data), process.env.TOKEN_KEY).toString(),
  );

export const decryptToken = (token: string): TokenDto =>
  JSON.parse(
    AES.decrypt(decodeURIComponent(token), process.env.TOKEN_KEY).toString(
      enc.Utf8,
    ),
  );
