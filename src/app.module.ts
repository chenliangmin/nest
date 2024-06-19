/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-13 14:56:18
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-17 10:10:00
 */
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter/exception.filter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DbModule } from './configs/db/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWtModule } from './configs/db/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/user/guard/jwt-auth.guard';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env']
    }),
    DbModule,
    JWtModule,
    UserModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
