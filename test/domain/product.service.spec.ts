import { Builder } from 'builder-pattern';
import { of } from 'rxjs';
import { ProductEntity } from '../../src/domain/entities/product.entity';
import { ProductRepository } from '../../src/domain/repositories/product.repository';
import { ProductService } from '../../src/domain/services/product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = {
      createProduct: jest.fn(),
      findAllProducts: jest.fn(),
      findProductById: jest.fn(),
      updateProduct: jest.fn(),
    } as unknown as ProductRepository;

    productService = new ProductService(productRepository);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe(ProductService.prototype.createProduct, () => {
    it('Should create a new product', () => {
      const product = getProductEntity();

      productRepository.createProduct = jest.fn().mockReturnValue(of(product));

      const result = productService.createProduct(product);

      result.subscribe((createdProduct) => {
        expect(productRepository.createProduct).toHaveBeenCalledWith(product);
        expect(createdProduct).toEqual(product);
      });
    });
  });

  describe(ProductService.prototype.findAll, () => {
    it('Should return a list of products', () => {
      const products = getProductEntityList();

      productRepository.findAllProducts = jest.fn().mockReturnValue(products);
      const result = productService.findAll();

      result.subscribe((createdProducts) => {
        expect(productRepository.findAllProducts).toHaveBeenCalled();
        expect(createdProducts).toEqual(products);
      });
    });
  });

  describe(ProductService.prototype.findById, () => {
    it('Should return a product by id', () => {
      const product = getProductEntity();
      productRepository.findProductById = jest.fn().mockReturnValue(product.id);

      const result = productService.findById(product.id);

      result.subscribe((selectedProduct) => {
        expect(productRepository.findProductById).toHaveBeenCalled();
        expect(selectedProduct.id).toEqual(product.id);
      });
    });
  });
});

const getProductEntity = (): ProductEntity => {
  return Builder(ProductEntity)
    .id('1bf48153-ec2b-405c-be30-99a6f109fdca')
    .title('Camisa')
    .description('Manga larga')
    .price(35000)
    .stock(4)
    .build();
};

const getProductEntityList = (): ProductEntity[] => {
  return [
    Builder(ProductEntity).title('Camiseta').build(),
    Builder(ProductEntity).title('Pantaloneta').build(),
    Builder(ProductEntity).title('Medias').build(),
  ];
};
