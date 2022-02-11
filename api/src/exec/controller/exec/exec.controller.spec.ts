import { Test, TestingModule } from '@nestjs/testing';
import { ExecController } from './exec.controller';

describe('ExecController', () => {
  let controller: ExecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecController],
    }).compile();

    controller = module.get<ExecController>(ExecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
