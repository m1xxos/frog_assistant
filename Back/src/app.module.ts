import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app/app.service';
import { AppGateway } from './app/app.gateway';
import { BotModule } from './bot/bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {config} from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { Msg } from './app/entities/msg.entity';

@Module({
  imports: [BotModule, ConfigModule.forRoot({
    isGlobal: true, load: [config]
  }),
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useClass: DatabaseConfig
}), TypeOrmModule.forFeature([Msg])],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {
  constructor(private configService: ConfigService) {
  }
}
