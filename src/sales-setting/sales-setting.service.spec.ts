import { Test, TestingModule } from '@nestjs/testing';
import { SalesSettingService } from './sales-setting.service';

describe('SalesSettingService', () => {
  let service: SalesSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesSettingService],
    }).compile();

    service = module.get<SalesSettingService>(SalesSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
