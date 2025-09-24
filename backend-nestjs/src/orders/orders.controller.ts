import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()      //method to add new order
  async create(@Req() req: any, @Body() body: CreateOrderDto) {
    const user = req.user;
    const amount = Number(body.amount);
    return this.ordersService.create(user.id, amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get()    //to get all the order ny userId 
  async list(@Req() req: any) {
    const user = req.user;
    return this.ordersService.findForUser(user.id);
  }
}
