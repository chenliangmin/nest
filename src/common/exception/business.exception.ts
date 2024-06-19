/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 17:44:03
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-17 17:51:08
 */
import { HttpException, HttpStatus } from '@nestjs/common'

import { ErrorEnum } from '../constant/error-code.constant'

export class BusinessException extends HttpException {

  constructor(error: ErrorEnum | string) {
    // 如果是非 ErrorEnum
    if (!error.includes(':')) {
      super(
        HttpException.createBody({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error,
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
      return
    }

    const [code, message] = error.split(':')
    super(
      HttpException.createBody({
        code,
        message,
      }),
      HttpStatus.INTERNAL_SERVER_ERROR,
    )

  }

}
