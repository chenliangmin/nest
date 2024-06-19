/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 15:36:25
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-19 14:55:52
 */
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ){}
  async create(createTagDto) {
    const { name, grade, superiors} = createTagDto
    const parent = new Tag();
    parent.name = name
    parent.grade = grade
    await this.tagRepository.save(parent);
  
    superiors&&superiors.forEach(async(element) => {
      const children = new Tag()
      children.name = element.name
      children.grade = element.grade
      children.parent = parent
      await this.tagRepository.save(children);
    });

  }

  async findAll() {
    return await this.tagRepository
    .createQueryBuilder('entity') // 设置表别名
    .leftJoinAndSelect('entity.children', 'parent')
    .getManyAndCount();
  }

  async findOne(id: string) {
    return await this.tagRepository.findOneBy({id});
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    return await this.tagRepository.update(id, updateTagDto)
  }

  async remove(id: string) {
    return await this.tagRepository.delete(id);
  }
}
