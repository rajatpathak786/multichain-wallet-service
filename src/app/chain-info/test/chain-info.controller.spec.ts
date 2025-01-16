import { Test, TestingModule } from '@nestjs/testing';
import { ChainInfoController } from '../chain-info.controller';
import { ChainInfoService } from '../chain-info.service';

describe('ChainInfoController', () => {
  let controller: ChainInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChainInfoController],
      providers: [ChainInfoService],
    }).compile();

    controller = module.get<ChainInfoController>(ChainInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
