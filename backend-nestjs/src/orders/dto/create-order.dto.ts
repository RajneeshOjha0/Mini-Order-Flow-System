import { IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @Min(0.01)
  amount: number;   //order amount should always be number
}
