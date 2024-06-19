/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-14 10:32:40
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-14 10:44:04
 */

import * as crypto from 'crypto'

/**
 * @name: 
 * @description: md5加密
 * @param {string} str 要加密的字符串
 * @return {*}
 */
export function md5(str: string): string {
  if (!str) {
    return ''
  }
  const hash = crypto.createHash('md5')
  return hash.update(str).digest('hex')
}