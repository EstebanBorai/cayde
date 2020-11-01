import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Unit } from '.';

@Entity()
export default class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @OneToOne(() => Unit)
  @JoinColumn()
  unit: Unit;

  @Column()
  quantity: number;

  @Column()
  price: number;
}