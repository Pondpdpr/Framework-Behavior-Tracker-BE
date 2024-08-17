import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AdminLoginDto, CreateUserDto, UpdateUserDto } from './dto/request.dto';
import { AdminLoginResponseDto } from './dto/response.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiOkResponse({ type: AdminLoginResponseDto })
  login(@Body() data: AdminLoginDto) {
    return { isValid: data.password === process.env.ADMIN_PASSWORD };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete()
  remove(@Body() userIds: number[]) {
    return this.userService.remove(userIds);
  }
}
