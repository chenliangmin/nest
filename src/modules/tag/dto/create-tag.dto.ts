/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 15:36:25
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-19 11:00:20
 */
interface Children {
  name: string;
  grade: string
}
export class CreateTagDto {
  name: string; 
  grade: string; 
  superiors: Children[];
}
