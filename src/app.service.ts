import { Injectable } from '@nestjs/common';
import { encryptToken } from '../util/encryption';

@Injectable()
export class AppService {
  getHello(): string {
    const text = { userId: 5, formId: 3 };
    const encrypted = encryptToken(text);
    return encrypted;
  }
}
