import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./order.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly repo: Repository<Order>,
    ) { }

    async create(dto: CreateOrderDto) {
        const order = this.repo.create(dto);
        return this.repo.save(order);
    }

    async findAll() {
        return this.repo.find({ order: { created_at: 'DESC' } });
    }

    async findOne(id: string) {
        const order = await this.repo.findOne({ where: { id } });
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async update(id: string, dto: UpdateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, dto);
        return this.repo.save(order);
    }

    async remove(id: string) {
        const order = await this.findOne(id);
        await this.repo.remove(order);
        return { message: 'Order deleted' };
    }
}
