import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')    //req otp endpoint
  async requestOtp(@Body() body: RequestOtpDto) {
    return this.authService.requestOtp(body.mobile);    //save the otp to redis form this method
  }
 
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto) {
    const res = await this.authService.verifyOtp(body.mobile, body.otp);   //verify the otp i correct then retrun the token to  frontend else retrun Invalid
    if (!res) {
      return { error: 'Invalid OTP' };
    }
    return res;
  }
}
