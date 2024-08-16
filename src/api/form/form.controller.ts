import { Controller, Get, Param, Post } from '@nestjs/common';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create() {
    return this.formService.create();
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.formService.findOneForUser(token);
  }
}
