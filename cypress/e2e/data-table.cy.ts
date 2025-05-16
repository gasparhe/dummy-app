describe('Data Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should display the data table', () => {
    cy.get('table').should('exist');
    cy.get('table').should('have.attr', 'aria-label', 'Data table');
  });

  it('should display correct number of rows', () => {
    cy.get('tr.mat-mdc-row').should('have.length', 4);
  });

  it('should display all columns with correct headers', () => {
    cy.get('th[role="columnheader"]').should('have.length', 6);
    cy.get('th[role="columnheader"]').eq(0).should('contain', 'Name');
    cy.get('th[role="columnheader"]').eq(1).should('contain', 'Column 2');
    cy.get('th[role="columnheader"]').eq(2).should('contain', 'Column 3');
    cy.get('th[role="columnheader"]').eq(3).should('contain', 'Column 4');
  });

  it('should have edit and delete buttons for each row', () => {
    cy.get('button[aria-label="Edit item"]').should('have.length', 4);
    cy.get('button[aria-label="Delete item"]').should('have.length', 4);
  });

  it('should have proper accessibility attributes', () => {
    cy.get('table').should('have.attr', 'aria-label');
    cy.get('th').each($th => {
      cy.wrap($th).should('have.attr', 'role', 'columnheader');
    });
    cy.get('tr.mat-mdc-row').each($tr => {
      cy.wrap($tr).should('have.attr', 'role', 'row');
    });
  });
});