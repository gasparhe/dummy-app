describe('Product Description Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.wait(1000); // wait for the page to load
  });

  it('should show loading state while fetching product details', () => {
    cy.get('tbody tr').first().click();
    cy.get('.loading-container').should('be.visible');
    cy.get('mat-spinner').should('exist');
    cy.get('.loading-container').contains('Loading product details...');
  });

  it('should display all product information with proper accessibility attributes', () => {
    cy.get('tbody tr').first().click();

    // Wait for product to load
    cy.get('.product-card').should('be.visible');

    // Check main container accessibility
    cy.get('[role="main"]').should('exist');
    cy.get('#product-title').should('exist');

    // Check image gallery accessibility
    cy.get('[role="region"][aria-label="Product images"]').should('exist');
    cy.get('.product-image').first().should('have.attr', 'alt');

    // Check price and description accessibility
    cy.get('[aria-label="Product price"]').should('exist');
    cy.get('[aria-label="Product description"]').should('exist');

    // Check navigation buttons accessibility
    cy.get('[aria-label="Back to products list"]').should('exist');
    cy.get('[aria-label="Edit product"]').should('exist');
  });

  it('should navigate back to product list when clicking back button', () => {
    cy.get('tbody tr').first().click();
    cy.get('[aria-label="Back to products list"]').click();
    cy.url().should('not.include', '/product-description');
    cy.get('table').should('be.visible');
  });

  it('should navigate to edit page when clicking edit button', () => {
    cy.get('tbody tr').first().click();
    cy.get('[aria-label="Edit product"]').click();
    cy.url().should('include', '/product/');
    cy.get('form').should('be.visible');
  });
});