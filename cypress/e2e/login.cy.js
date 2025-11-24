describe('Login flow', () => {
  it('should show an error for incorrect login', () => {
    // Start from the home page
    cy.visit('http://localhost:5173/');

    // Find a link with an href attribute containing "login" and click it
    cy.get('a[href*="login"]').click();

    // The new url should include "/login"
    cy.url().should('include', '/login');

    // Get an input with name="email" and type "test@example.com"
    cy.get('input[name="email"]').type('test@example.com');

    // Get an input with name="password" and type "password123"
    cy.get('input[name="password"]').type('password123');

    // Get the login button and click it
    cy.get('button').contains('Login').click();

    // This assertion is designed to fail to create a "red flag"
    cy.get('body').should('contain', 'Login Gagal');
  });
});
