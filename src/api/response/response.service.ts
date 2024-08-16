import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decryptToken } from 'util/encryption';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './entities/response.entity';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  async create(token: string, createResponseDto: CreateResponseDto) {
    const info = decryptToken(token);
    const response: Response = this.responseRepository.create({
      ...info,
      ...createResponseDto,
    });
    return this.responseRepository.save(response);
  }

  async findAll() {
    return await this.responseRepository.find();
  }
}
