import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as slugPlugin from 'mongoose-slug-generator';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiServiceModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        connectionFactory: (connection) => {
          connection.plugin(slugPlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    ApiServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
