/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 15:36:25
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-18 10:18:44
 */
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
