describe('Login flow', () => {
  it('should login successfully with correct credentials', () => {
    // Start from the home page
    cy.visit('http://localhost:5173/');

    // Find a link with an href attribute containing "login" and click it
    cy.get('a[href*="login"]').click();

    // The new url should include "/login"
    cy.url().should('include', '/login');

    // Use a valid test user account
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');

    // Get the login button and click it
    cy.get('button').contains('Login').click();

    // After login, the URL should change back to the home page
    cy.url().should('eq', 'http://localhost:5173/');

    // And the page should contain text that indicates a successful login, like a "Logout" button
    cy.get('nav').should('contain', 'Logout');
  });
});
