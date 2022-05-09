import { ApiProperty } from '@nestjs/swagger';

export class BaseApiServiceDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly body: string;
}
