import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LoginController } from './login/login.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './contants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, PrismaService, UsersService],
  controllers: [LoginController],
})
export class AuthModule {}
