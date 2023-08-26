import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/* It's a wrapper around the PrismaClient class that makes sure the Prisma client is connected to the
database when the Nest application starts */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * It connects to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * It adds a listener to the process object that will close the NestJS application when the process
   * is about to exit
   * @param {INestApplication} app - INestApplication - The Nest application instance
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
