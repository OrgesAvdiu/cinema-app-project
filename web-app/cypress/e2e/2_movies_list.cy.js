describe('Cinema App - Test 2: Movies List Display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display movies container or section', () => {
    cy.get('body').should('be.visible');
    cy.get('[class*="movie"], [class*="Movie"], [data-testid*="movie"]')
      .should('exist')
      .or(cy.get('section, div[role="main"]').should('exist'));
  });

  it('should have content in the page', () => {
    cy.get('body').children().should('have.length.greaterThan', 0);
    cy.get('body').invoke('text').should('not.be.empty');
  });
});
