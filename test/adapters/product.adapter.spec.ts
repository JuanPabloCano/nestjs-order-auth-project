import { Test, TestingModule } from '@nestjs/testing';
import { ProductAdapter } from '../../src/adapters/product/product.adapter';

describe('Product', () => {
  let provider: ProductAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAdapter],
    }).compile();

    provider = module.get<ProductAdapter>(ProductAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
