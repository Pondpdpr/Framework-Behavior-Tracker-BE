import { ApiProperty } from '@nestjs/swagger';
import { EmailActivityStatus } from '../entities/user.entity';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  thaiFirstName: string;

  @ApiProperty()
  thaiLastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  directSuperior: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  dealership: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  market: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  isSubmitted: boolean;

  @ApiProperty({ type: EmailActivityStatus })
  dailyEmailActivityStatus: EmailActivityStatus;

  @ApiProperty({ type: EmailActivityStatus })
  reminderEmailActivityStatus: EmailActivityStatus;
}

export class AdminLoginResponseDto {
  @ApiProperty()
  isVaild: boolean;
}
