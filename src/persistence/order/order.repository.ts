import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repository/ports/order.repository";
import { PrismaService } from '../prisma.service';
import { OrderMapper } from "./order.mapper";
import { NotPersistedOrder, Order } from "src/entities/domain/order";
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
    constructor(
        private prismaService: PrismaService,
        private orderMapper: OrderMapper
    ){}

    async create(order: NotPersistedOrder) {
        const persistedOrder = await this.prismaService.order.create({
            data: this.orderMapper.toPersistence(order),
            include: { customer: true }
        });
        return this.orderMapper.fromPersistence(persistedOrder)
    }

    async findAll(): Promise<Order[]> {
        const persistedOrders = await this.prismaService.order.findMany({
            include: { customer: true }
        });
        return persistedOrders.map( p => this.orderMapper.fromPersistence(p) )
    }

    async findSort(): Promise<Order[]> {
        const persistedOrders = await this.prismaService.order.findMany({
            include: { customer: true },
            where : {
                NOT: [
                {
                    status : OrderStatusValue.Finished,
                },
                {
                    status : OrderStatusValue.Pending
                }
            ]},
            orderBy: [{
                    statusNum : 'desc',
                },{
                    createdAt : 'asc'
                }]
        });
        return persistedOrders.map(p => this.orderMapper.fromPersistence(p))
    }

    async updateStatus(id, param){

        return await this.prismaService.order.update({
            where: {
              id
            },
            data : { status : param.status, statusNum : param.statusNum }
        });
    }
}