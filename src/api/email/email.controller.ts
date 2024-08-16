import { Body, Controller, Param, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

import { ApiOkResponse } from '@nestjs/swagger';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('rule/:id')
  @ApiOkResponse()
  async sendRule(@Param('id') ruleId: string) {
    const sendmail = await this.emailService.sendRule(+ruleId);
  }

  @Post('daily-mail')
  @ApiOkResponse()
  async sendDailyMail(@Body() sendEmailDto: SendEmailDto) {
    const sendmail = await this.emailService.sendAllMail(sendEmailDto.users);
  }

  @Post('reminder')
  @ApiOkResponse()
  async sendReminder(@Body() sendEmailDto: SendEmailDto) {
    const sendmail = await this.emailService.sendReminder(sendEmailDto.users);
  }
}
