import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as ExcelJS from 'exceljs';
import { Repository } from 'typeorm';
import { Response } from '../response/entities/response.entity';
import { User } from '../user/entities/user.entity';

const allResponse = {
  P1: 'X',
  P2: 'X',
  P3: 'X',
  P4: 'X',
  P5: 'X',
  S1: 'X',
  S2: 'X',
  S3: 'X',
  S4: 'X',
  S5: 'X',
  B1: 'X',
  B2: 'X',
  B3: 'X',
  B4: 'X',
  B5: 'X',
};

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async exportUserXLS() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('UserReport');

    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'First name', key: 'firstName' },
      { header: 'Last name', key: 'lastName' },
      { header: 'Thai first name', key: 'thaiFirstName' },
      { header: 'Thai last name', key: 'thaiLastName' },
      { header: 'Email', key: 'email' },
      { header: 'Gender', key: 'gender' },
      { header: 'Group', key: 'group' },
      { header: 'Position', key: 'position' },
      { header: 'Direct superior', key: 'directSuperior' },
      { header: 'Location', key: 'location' },
      { header: 'Dealership', key: 'dealership' },
      { header: 'Phone', key: 'phone' },
      { header: 'Market', key: 'market' },
      { header: 'Active', key: 'isActive' },
    ];

    const users = await this.userRepository.find({ order: { id: 'ASC' } });

    users.map((user) => worksheet.addRow(user));

    return await workbook.xlsx.writeBuffer();
  }
  async exportResponseXLS() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('UserReport');

    worksheet.columns = [
      { header: 'Timestamp', key: 'created_at' },
      { header: 'First name', key: 'firstName' },
      { header: 'Last name', key: 'lastName' },
      { header: 'Thai first name', key: 'thaiFirstName' },
      { header: 'Thai last name', key: 'thaiLastName' },
      { header: 'Email', key: 'email' },
      { header: 'Position', key: 'position' },
      { header: 'Group', key: 'group' },
      { header: 'Direct superior', key: 'directSuperior' },
      { header: 'Location', key: 'location' },
      { header: 'Dealership', key: 'dealership' },
      { header: 'Phone', key: 'phone' },
      { header: 'Market', key: 'market' },
      { header: 'Active', key: 'isActive' },
      { header: 'Sales Lead Management', key: 'P1' },
      { header: 'Customer Logging', key: 'P2' },
      { header: 'STS/Sales Funnel Management', key: 'P3' },
      { header: 'Sales Meeting Optimisation', key: 'P4' },
      { header: 'Time Management', key: 'P5' },
      { header: 'Sales Presentation', key: 'S1' },
      { header: 'Closing Techniques', key: 'S2' },
      { header: 'Customer Follow-Ups', key: 'S3' },
      { header: 'Objection Handling', key: 'S4' },
      { header: 'Using Scripts', key: 'S5' },
      { header: `Customer's Name x5`, key: 'B1' },
      { header: 'Gestures', key: 'B2' },
      { header: 'Eye Contact', key: 'B3' },
      { header: 'Tone Of Voice', key: 'B4' },
      { header: 'Active/Mindful Listening', key: 'B5' },
    ];

    const responses = await this.responseRepository.find({
      relations: { user: true, answers: { question: true } },
      order: { created_at: 'ASC' },
    });

    responses.map((response) => {
      const { user, answers, created_at } = response;
      const answerData = {};
      answers.map(
        (answer) => (answerData[answer.question.behavior] = answer.answer),
      );
      created_at.setMinutes(
        created_at.getMinutes() + created_at.getTimezoneOffset() * -1,
      );
      created_at.setHours(created_at.getHours() + 7);
      const data = { ...allResponse, ...user, created_at, ...answerData };
      worksheet.addRow(data);
    });

    return await workbook.xlsx.writeBuffer();
  }
}
