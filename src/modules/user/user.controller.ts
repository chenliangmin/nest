/*
 * @Description: 用户模块
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-13 15:02:22
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-18 15:02:50
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Public } from 'src/utils/public';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiResult } from 'src/common/decorator/api-result.decorator';
import { User } from './entities/user.entity';
import { LoginToken } from 'src/common/model/response.model';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  @ApiResult({type: User, isPage: false})
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  @ApiResult({type: LoginToken, isPage: false})
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '列表',
  })
  @ApiResult({type: [User], isPage: true})
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '查询',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
