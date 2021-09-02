import Products from "@modules/products/infra/typeorm/entities/Products";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Orders from "./Orders";

@Entity('orders_products')
export default class OrdersProducts {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(() => Orders, order => order.order_products)
    @JoinColumn({name: 'order_id'})
    order: Orders

    @ManyToOne(() => Products, products => products.order_products)
    @JoinColumn({name: 'product_id'})
    products: Products

    @Column()
    order_id: string;

    @Column()
    product_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
