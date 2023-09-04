/**
 * @Description: 用户信息相关实体
 * @Author: OceanH
 * @Date: 2023-09-02 13:35:07
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 用户信息
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column()
  sex: number;

  // 身份证类型
  @Column()
  card_type: number;

  // 身份证号
  @Column({ type: 'varchar' })
  card_number: string;

  // 旧密码
  @Column({ type: 'varchar', select: false })
  old_password: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  // 总里程
  @Column({ type: 'varchar' })
  total_length: string;

  @Column({ type: 'varchar' })
  total_duration: string;

  @Column({ type: 'varchar' })
  total_order_quantity: string;

  @Column({ type: 'varchar' })
  total_regions_id: string;

  // 用户级别： 管理员/普通用户
  @Column({ type: 'varchar', select: false })
  perms: string;
}
