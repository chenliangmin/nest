/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 16:54:09
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-18 14:44:50
 */
import { ApiProperty } from '@nestjs/swagger'

import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from '../constant/response.constant'

export class ResOp<T = any> {
  @ApiProperty({ type: 'object' })
  data?: T

  @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
  code: number

  @ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MSG })
  message: string

  constructor(code: number, data: T, message = RESPONSE_SUCCESS_MSG) {
    this.code = code
    this.data = data
    this.message = message
  }

  static success<T>(data?: T, message?: string) {
    return new ResOp(RESPONSE_SUCCESS_CODE, data, message)
  }

  static error(code: number, message) {
    return new ResOp(code, {}, message)
  }
}

export class LoginToken{
  @ApiProperty({ type: 'string', description: '认证的token' })
  token: string
}
