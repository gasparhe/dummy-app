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

  it('should show loading state and success message when deleting', () => {
    // open delete dialog
    cy.get('tbody tr').first().within(() => {
      cy.get('button').last().click();
    });

    // store initial number of rows
    cy.get('tbody tr').its('length').then((initialRows) => {
      // confirm delete
      cy.get('button').contains('Delete').click();

      // check loading state
      cy.get('mat-spinner').should('be.visible');
      cy.get('p').contains('Deleting product...').should('be.visible');

      // check success message
      cy.get('h2').contains('Success').should('be.visible');
      cy.get('mat-dialog-content').contains('Successfully deleted').should('be.visible');

      // Verificar que se eliminó la fila
      cy.get('tbody tr').should('have.length', initialRows - 1);
    });
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