import { Controller, Get } from '@nestjs/common';
import { encryptToken } from 'util/encryption';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return encryptToken({ userId: 1, formId: 3 });
  }
}
