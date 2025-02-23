import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '创建时间'
  })
  create_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '更新时间'
  })
  update_at: Date
}
