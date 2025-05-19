describe('Delete Product Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.wait(1000); // wait for the page to load
  });

  it('should open delete confirmation dialog when clicking delete button', () => {
    // click on the first delete button
    cy.get('tbody tr').first().within(() => {
      cy.get('button').last().click();
    });

    // check if dialog is open
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('mat-dialog-content').should('contain', 'Are you sure you want to delete');
  });

  it('should close dialog when clicking cancel', () => {
    // open delete dialog
    cy.get('tbody tr').first().within(() => {
      cy.get('button').last().click();
    });

    cy.get('button').contains('Cancel').click();
    cy.get('mat-dialog-container').should('not.exist');
  });

  it('should handle error state when delete fails', () => {
    // simulate error response
    cy.intercept('DELETE', '**/products/*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('deleteError');

    // open delete dialog
    cy.get('tbody tr').first().within(() => {
      cy.get('button').last().click();
    });

    // confirm delete
    cy.get('button').contains('Delete').click();

    // verify error state
    cy.wait('@deleteError');
    cy.get('h2').contains('Error').should('be.visible');
    cy.get('mat-dialog-content')
      .contains('There was a problem, please try again later')
      .should('be.visible');
  });
});