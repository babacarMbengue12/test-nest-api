import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Transform(({ value }) => value.toString())
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: false, default: false })
  deleted: boolean;

  @Prop({ required: false, default: null })
  deletedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
// eslint-disable-next-line @typescript-eslint/no-var-requires
PostSchema.plugin(require('mongoose-autopopulate'));
// eslint-disable-next-line @typescript-eslint/no-var-requires
PostSchema.plugin(require('mongoose-delete'), {
  deletedAt: true,
  overrideMethods: true,
});
