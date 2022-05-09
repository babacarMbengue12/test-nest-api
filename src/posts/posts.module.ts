import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiServiceController } from './post.controller';
import { ApiServiceService } from './posts.service';
import { Post, PostSchema } from './schemas/posts.schema';

@Module({
  providers: [ApiServiceService],
  controllers: [ApiServiceController],
  exports: [ApiServiceService],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class ApiServiceModule {}
