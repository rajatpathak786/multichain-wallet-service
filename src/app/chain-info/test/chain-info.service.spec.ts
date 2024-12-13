import { Test, TestingModule } from '@nestjs/testing';
import { ChainInfoService } from '../chain-info.service';

describe('ChainInfoService', () => {
  let service: ChainInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainInfoService],
    }).compile();

    service = module.get<ChainInfoService>(ChainInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
