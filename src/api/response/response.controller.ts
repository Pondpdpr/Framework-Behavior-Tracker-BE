import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { ResponseService } from './response.service';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post(':token')
  create(
    @Param('token') token: string,
    @Body() createResponseDto: CreateResponseDto,
  ) {
    return this.responseService.create(token, createResponseDto);
  }

  @Get()
  findAll() {
    return this.responseService.findAll();
  }
}
