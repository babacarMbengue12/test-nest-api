import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseApiServiceDto } from './dto/base-apiservice.dto';
import { ApiServiceService } from './posts.service';

@ApiTags('Posts Api')
@Controller('posts')
export class ApiServiceController {
  constructor(private readonly service: ApiServiceService) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: BaseApiServiceDto) {
    return await this.service.create(data);
  }

  @Delete('delete/:id')
  async deleteApiService(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: BaseApiServiceDto) {
    return await this.service.update(id, data);
  }
}
