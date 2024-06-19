/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 17:31:22
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-17 17:56:35
 */
export enum  ErrorEnum{
  DEFAULT = '0:未知错误',
  SERVER_ERROR = '500:服务器繁忙，请稍后再试',
  SYSTEM_USER_EXISTS = '1001:系统用户已存在',
  SYSTEM_USER_NOT_FIND = '10012:用户不存在',
  INVALID_USERNAME_PASSWORD = '1003:用户密码有误',
}