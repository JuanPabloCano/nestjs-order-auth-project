import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/domain/services/order.service';

describe('OrderService', () => {
  let provider: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    provider = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
