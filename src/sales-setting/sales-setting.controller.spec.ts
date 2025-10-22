import { Test, TestingModule } from '@nestjs/testing';
import { SalesSettingController } from './sales-setting.controller';

describe('SalesSettingController', () => {
  let controller: SalesSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesSettingController],
    }).compile();

    controller = module.get<SalesSettingController>(SalesSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
