/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 15:36:25
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-19 11:43:36
 */
import { Base } from "src/common/entity/base.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity('tag')
export class Tag extends Base{
  @Column({
    type: 'varchar',
    comment: '标签名称'
  })
  name: string;

  @ManyToOne(() => Tag, (tag) => tag.children)
  parent: Tag;

  @OneToMany(() => Tag, (tag) => tag.parent)
  children: Tag[];

  @Column()
  grade: string
}
