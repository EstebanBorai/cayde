import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Unit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    shortName: string;
}
