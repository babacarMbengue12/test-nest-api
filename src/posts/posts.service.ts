import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseApiServiceDto } from './dto/base-apiservice.dto';
import { Post, PostDocument } from './schemas/posts.schema';

@Injectable()
export class ApiServiceService {
  constructor(
    @InjectModel(Post.name)
    private readonly model: Model<PostDocument>,
  ) {}
  async findAll() {
    return this.model.find({});
  }

  async findOne(id: string) {
    return this.model.findOne({ _id: id });
  }

  async create(data: BaseApiServiceDto) {
    const newData = new this.model(data);
    await newData.save();
    return newData;
  }

  async update(id: string, data: BaseApiServiceDto) {
    return await this.model.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
