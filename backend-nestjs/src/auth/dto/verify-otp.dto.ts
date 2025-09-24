import { IsMobilePhone, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()   //  just treat it as string or testing purpose we will add the validation after  some time 
  mobile: string;
  
  @IsNotEmpty()
  @IsString()   //  just treat it as string for testing else we make it to number
  otp: string;
}
