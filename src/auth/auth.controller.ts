import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/signInRequest.dto';
import { SignInResponse } from './dto/signInResponse.dto';
import { AuthGuard } from 'helpers/auth.guard';
import { User } from 'src/user/dto/user.dto';
import { registerRequest } from './dto/registerRequest.dto';
import { LoggingInterceptor } from 'helpers/logging.interceptor';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInRequest): Promise<SignInResponse> {
    return await this.authService.signIn(signInDto.email, signInDto.password, signInDto.recaptchaToken);
  }

  @Post('register')
  async registerUser(@Body() registerDto: registerRequest): Promise<SignInResponse> {
    return await this.authService.registerUser(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getLoggedInUser(@Request() req): Promise<User> {
    return await this.authService.getLoggedInUser(req.user.email);
  }
}
