import { IsNotEmpty, IsString } from 'class-validator';

export class RequestOtpDto {
  @IsNotEmpty()
  @IsString()  
  mobile: string;   // validate the mobile no
}
