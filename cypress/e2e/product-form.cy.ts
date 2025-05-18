import { Product } from '../../src/app/services/product.service';

describe('Product Form', () => {
  const mockProduct: Omit<Product, 'id'> = {
    title: 'Test Product',
    description: 'A test product description',
    category: 'test',
    price: 99.99,
    images: ['https://example.com/test-image.jpg']
  };

  beforeEach(() => {
    // Interceptar las llamadas a la API
    cy.intercept('POST', 'https://dummyjson.com/products/add', {
      statusCode: 201,
      body: { ...mockProduct, id: 1 }
    }).as('createProduct');

    cy.intercept('GET', 'https://dummyjson.com/products/*', {
      statusCode: 200,
      body: { ...mockProduct, id: 1 }
    }).as('getProduct');

    cy.intercept('PUT', 'https://dummyjson.com/products/*', {
      statusCode: 200,
      body: { ...mockProduct, id: 1 }
    }).as('updateProduct');
  });

  describe('Edit Product', () => {
    const productId = 1;
    const updatedProduct = {
      ...mockProduct,
      title: 'Updated Test Product',
      price: 149.99
    };

    beforeEach(() => {
      cy.visit(`http://localhost:4200/product/${productId}`);
    });

    it('should load existing product data', () => {
      cy.wait(500);

      cy.get('[data-testid="product-form"]')
        .should('be.visible')
        .and('have.attr', 'role', 'form')
        .and('have.attr', 'aria-label', 'Edit Product Form');

      // Verificar que los campos estén prellenados
      cy.get('[data-testid="title-input"]')
        .should('have.value', mockProduct.title);

      cy.get('[data-testid="description-input"]')
        .should('have.value', mockProduct.description);

      cy.get('[data-testid="category-input"]')
        .should('have.value', mockProduct.category);

      cy.get('[data-testid="price-input"]')
        .should('have.value', mockProduct.price);
    });

    it('should successfully update a product', () => {
      cy.wait(500);

      // Actualizar campos
      cy.get('[data-testid="title-input"]')
        .clear()
        .type(updatedProduct.title);

      cy.get('[data-testid="price-input"]')
        .clear()
        .type(updatedProduct.price.toString());

      // Enviar el formulario
      cy.get('[data-testid="submit-button"]').click();

      // Verificar redirección y mensaje de éxito
      cy.url().should('include', '/product');
    });      

  });
});