import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from "typeorm";

import {User} from "src/users/user.entity";

@Entity("tasks")
export  class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string

    @Column()
    description?: string


    @Column()
    weight?: number



    @Column({ type: 'tsvector', nullable: true })
    @Index('task_search_vector_idx', { synchronize: false })
    searchVector?: string;

    @ManyToOne(() => User, (user) => user.tasks)
    assignedTo?: User;
}