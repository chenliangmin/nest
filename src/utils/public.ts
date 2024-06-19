/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-14 15:54:32
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-14 16:12:01
 */
import { SetMetadata } from "@nestjs/common";
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)