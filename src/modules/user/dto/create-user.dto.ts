/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-13 15:02:22
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-18 11:02:03
 */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4,30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/,{
    message: '用户名只能是字母、数字或者 #、$、%、_、- 这些字符'
  })
  @ApiProperty({description: '用户名',required: true})
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(4,30)
  @ApiProperty({description: '密码',required: true})
  password: string;
}
export class CreateUserDto extends LoginUserDto{
 
  @ApiProperty({description: '角色',required: false})
  role?: string;

  @ApiProperty({description: '昵称',required: false})
  nickname?: string;

  @ApiProperty({description: '年龄',required: false})
  age?: string;

  @ApiProperty({description: '头像',required: false})
  avatar?: string;

  @ApiProperty({description: '性别',required: false})
  sex?: string;

  @ApiProperty({description: 'email',required: false})
  email?: string;
}
