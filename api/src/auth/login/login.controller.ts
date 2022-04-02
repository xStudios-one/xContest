import {
  Controller,
  Post,
  UseGuards,
  Request,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Controller('auth')
export class LoginController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() req) {
    if (
      !req.username ||
      !req.password ||
      typeof req.username != 'string' ||
      typeof req.password != 'string'
    ) {
      throw new BadRequestException();
    }
    return this.usersService.createUser(req.username, req.password);
  }
}
