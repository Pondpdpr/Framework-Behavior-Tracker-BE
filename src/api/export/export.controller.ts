import { Controller, Get, Res } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Get('user')
  @ApiOkResponse()
  async getUserExcel(@Res() res: Response) {
    const buffer = await this.exportService.exportUserXLS();
    res.header(
      'Content-Disposition',
      `attachment; filename=users${new Date().valueOf()}.xlsx`,
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('latest-form-response')
  @ApiOkResponse()
  async getLastestResponseExcel(@Res() res: Response) {
    const buffer = await this.exportService.exportLatestResponseXLS();
    res.header(
      'Content-Disposition',
      `attachment; filename=latestresponse${new Date().valueOf()}.xlsx`,
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('response')
  @ApiOkResponse()
  async getResponseExcel(@Res() res: Response) {
    const buffer = await this.exportService.exportResponseXLS();
    res.header(
      'Content-Disposition',
      `attachment; filename=response${new Date().valueOf()}.xlsx`,
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }

  @Get('response-checkbox')
  @ApiOkResponse()
  async getResponseCheckBoxExcel(@Res() res: Response) {
    const buffer = await this.exportService.exportResponseCheckBoxXLS();
    res.header(
      'Content-Disposition',
      `attachment; filename=responsecheckbox${new Date().valueOf()}.xlsx`,
    );
    res.type(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.send(buffer);
  }
}
