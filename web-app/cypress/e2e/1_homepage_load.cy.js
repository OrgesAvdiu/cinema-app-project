describe('Cinema App - Test 1: Homepage Load', () => {
  it('should load homepage successfully', () => {
    // Test: Visit homepage
    cy.visit('http://localhost:3000');
    
    // Verify page loads
    cy.url().should('include', 'localhost:3000');
    
    // Check if main content is visible
    cy.get('body').should('be.visible');
  });

  it('should display header on homepage', () => {
    // Test: Header/Navigation is visible
    cy.visit('http://localhost:3000');
    
    // Check if navigation or header exists
    cy.get('header, nav, [role="banner"]').should('exist');
  });
});
