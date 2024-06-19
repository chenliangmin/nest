/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-13 14:56:18
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-18 15:00:06
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResOp } from './common/model/response.model';

import { writeFileSync } from 'fs'
import { Base } from './common/entity/base.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
  .setTitle('ladd')
  .setDescription('博客系统文档')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const docmment = SwaggerModule.createDocument(app, options, {
    extraModels: [ResOp]
  })
  writeFileSync('dist/swagger.json', JSON.stringify(docmment))
  SwaggerModule.setup('api-doc', app, docmment)
  const PORT = process.env.SERVE_PORT
  await app.listen(PORT);
  
}
bootstrap();
