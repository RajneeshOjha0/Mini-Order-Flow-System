import { Injectable } from '@nestjs/common';
import { RedisService } from '../common/redis.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redis: RedisService,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly jwtService: JwtService,      //for creating jwt token
  ) {}

  async requestOtp(mobile: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit ranom number for otp
    await this.redis.set(`otp:${mobile}`, otp, 120); //120sec =  2 minutes to store otp in redis 
    console.log(`OTP for ${mobile}: ${otp} (enter this otp in frontend)`);
    return { ok: true,message:"otp is generated and send you can check the otp in terminal console and enter it on UI" };
  }

  async verifyOtp(mobile: string, otp: string) {   //get the mobile and otp form req body
    const key = `otp:${mobile}`;
    const stored = await this.redis.get(key);     //fetch it from redis
    if (!stored || stored !== otp) {
      return null;
    }
    await this.redis.del(key);    //remove it from redis

    // find or create user
    let user = await this.usersRepo.findOne({ where: { mobile } });
    if (!user) {
      user = this.usersRepo.create({ mobile });   
      await this.usersRepo.save(user);  //if user alredy exist update the user else create a new user
    }

    const payload = { sub: user.id, mobile: user.mobile };
    const token = this.jwtService.sign(payload);  //generate the jwt token
    return { access_token: token ,message:"User logged in successffully"};
  }
}
