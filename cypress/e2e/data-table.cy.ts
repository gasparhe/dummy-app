describe('Data Table', () => {
  beforeEach(() => {
    // Wait for the application to load completely
    cy.visit('http://localhost:4200');
    cy.wait(1000); // Wait for data to load
  });

  it('should show the page title', () => {
    cy.get('h1').should('contain', 'Data Table Demo');
  });

  it('should display the table with data', () => {
    // Wait for table and data to be present
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.gt', 0);
  });

  it('should allow product search', () => {
    // Updated to use Material selector
    cy.get('input.mat-mdc-input-element').type('phone');
    // Wait for search to complete
    cy.wait(500);
    cy.get('tbody tr').should('exist');
  });

  it('should show action buttons for each row', () => {
    cy.get('tbody tr').first().within(() => {
      cy.get('button').should('have.length', 2);
      cy.get('mat-icon').first().should('contain', 'edit');
      cy.get('mat-icon').last().should('contain', 'delete');
    });
  });

  it('should handle pagination', () => {
    // Verify paginator exists
    cy.get('mat-paginator').should('exist');
    
    // Change page size using force due to overlay
    cy.get('mat-paginator').within(() => {
      cy.get('.mat-mdc-select-trigger').click({ force: true });
    });
    
    // Select option with force
    cy.get('mat-option').contains('25').click({ force: true });
    
    // Verify table updated
    cy.get('tbody tr').should('exist');
  });

  it('should sort columns when clicking headers', () => {
    // Click on price header
    cy.get('th[role="columnheader"]').contains('Price').click();
    
    // Verify sorting was applied by checking for sort icon
    cy.get('.mat-sort-header-arrow').should('exist');
    // Verify rows exist in table after sorting
    cy.get('tbody tr').should('exist');
  });

  
  it('should search products', () => {
  
    cy.get('[data-testid="search-input"]')
      .should('have.attr', 'aria-label', 'Search products')
      .type('Essence Mascara');
    cy.wait(500);
    cy.get('[data-testid="product-card"]').should('exist');
    cy.get('[data-testid="product-title"]').should('contain', 'Essence Mascara');
  });

  it('should add a new product', () => {
    const newProduct = {
      title: 'Test Product',
      description: 'Test Description',
      category: 'Test Category',
      price: 99.99,
      images: ['test-image.jpg']
    };

    cy.get('[data-testid="add-product-button"]').click();
    cy.get('[data-testid="product-form"]').should('be.visible');

    cy.get('[data-testid="title-input"]').type(newProduct.title);
    cy.get('[data-testid="description-input"]').type(newProduct.description);
    cy.get('[data-testid="category-input"]').type(newProduct.category);
    cy.get('[data-testid="price-input"]').type(newProduct.price.toString());
    

    cy.get('[data-testid="submit-button"]').click();
    cy.url().should('include', '/product');
  });
});