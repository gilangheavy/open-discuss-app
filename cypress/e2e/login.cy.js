/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // Verify login page elements
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button').contains(/masuk/i).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // Click login without filling email
    cy.get('button').contains(/masuk/i).click();

    // Verify validation message (browser validation or custom)
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('should display alert when password is empty', () => {
    // Fill email but not password
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains(/masuk/i).click();

    // Verify password validation
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('should display alert when email and password are wrong', () => {
    // Fill wrong credentials
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button').contains(/masuk/i).click();

    // Verify error message appears
    cy.contains(/email or password is wrong/i, {timeout: 10000}).should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    // Fill correct credentials
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/masuk/i).click();

    // Verify redirect to homepage
    cy.url({timeout: 10000}).should('eq', `${Cypress.config().baseUrl}/`);

    // Verify user is logged in (check for logout button or user menu)
    cy.get('button').contains(/logout/i, {timeout: 10000}).should('be.visible');
  });
});
