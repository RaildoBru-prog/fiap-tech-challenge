import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/application/ports/order.repository";
import { PrismaService } from '../prisma.service';
import { OrderMapper } from "./order.mapper";
import { NotPersistedOrder, Order } from "src/entities/domain/order";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
    constructor(
        private prismaService: PrismaService,
        private orderMapper: OrderMapper
    ){}

    async create(order: NotPersistedOrder): Promise<Order> {
        const persistedOrder = await this.prismaService.order.create({
            data: this.orderMapper.toPersistence(order),
            include: { customer: true }
        });
        return this.orderMapper.fromPersistence(persistedOrder);
        
    }

    async findAll(): Promise<Order[]> {
        const persistedOrders = await this.prismaService.order.findMany({
            include: { customer: true }
        });
        return persistedOrders.map(p => this.orderMapper.fromPersistence(p))
    }

}