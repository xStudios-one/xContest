import { Module } from '@nestjs/common';
import { ExecModule } from './exec/exec.module';
import { PrismaService } from './service/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContestsModule } from './contests/contests.module';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [
    ExecModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    AuthModule,
    UsersModule,
    ContestsModule,
    ProblemsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
