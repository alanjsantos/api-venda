import Customers from "@modules/customers/typeorm/entities/Customers";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('orders')
export default class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customers)
    @JoinColumn({name: 'customer_id'})
    customer: Customers

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
