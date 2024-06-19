/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-13 15:02:22
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-17 17:49:58
 */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { md5 } from 'src/utils/md5';
import { JwtService } from '@nestjs/jwt';
import { BusinessException } from 'src/common/exception/business.exception';
import { ErrorEnum } from 'src/common/constant/error-code.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(JwtService)
    private jwtService: JwtService
  ){}
  async register(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const existUser = await this.userRepository.findOneBy({username})
    if (existUser) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_EXISTS)
    }
    const md5Password = md5(password)
    const newUser = { ...createUserDto, ...{password: md5Password}}
    try {
      return await this.userRepository.save(newUser)
    } catch (error) {
      throw new BusinessException(error)
      // throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  async login(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto
    const existUser = await this.userRepository.findOne({where: {username}, select: ['id','username', 'password']})
    if (!existUser) {
      throw new BusinessException(ErrorEnum.SYSTEM_USER_NOT_FIND)
    }
    if (existUser.password !== md5(password)) {
      // throw new HttpException('密码错误，请重新登录', 500);
      throw new BusinessException(ErrorEnum.INVALID_USERNAME_PASSWORD)
    }
    const payload = {
      username: existUser.username,
      sub: existUser.id
    }
    return this.jwtService.sign({user: payload})
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return await this.userRepository.createQueryBuilder('user').where("user.id = :id", { id }).getMany()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.createQueryBuilder('user').update().set(updateUserDto).where('user.id = :id', {id}).execute()
  }

  async remove(id: string) {
    await this.userRepository.softDelete(id)
  }
}
