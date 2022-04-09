import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  BadRequestException,
  Body,
  ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('ping')
  async ping() {
    return 'success';
  }

  @Post('register')
  async register(@Body() req) {
    if (
      !req.username ||
      !req.password ||
      !req.email ||
      typeof req.username != 'string' ||
      typeof req.password != 'string' ||
      typeof req.email != 'string' ||
      req.username.length > 20 ||
      req.password > 30
    ) {
      throw new BadRequestException();
    }
    const creationResult = await this.usersService.createUser(
      req.username,
      req.password,
      req.email,
    );

    if (!creationResult) throw new ConflictException();
    else return creationResult;
  }
}
