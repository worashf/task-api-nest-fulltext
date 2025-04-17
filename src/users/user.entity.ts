import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import {Task} from "../tasks/task.entity";
@Entity("users")
export class  User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @OneToMany(() => Task, (task) => task.assignedTo)
    tasks?: Task[]

}