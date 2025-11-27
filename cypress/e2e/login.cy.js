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
    // Intercept login API call and return error response
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginRequest');

    // Fill wrong credentials
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button').contains(/masuk/i).click();

    // Wait for API call
    cy.wait('@loginRequest');

    // Verify error message appears (toast notification)
    cy.contains(/email or password is wrong/i, {timeout: 10000}).should('be.visible');
  });

  it('should display homepage when email and password are correct', () => {
    // Intercept login API call and return success
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'mock-jwt-token-1234567890',
        },
      },
    }).as('loginSuccess');

    // Intercept get own profile API call
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-test-123',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random',
          },
        },
      },
    }).as('getProfile');

    // Fill correct credentials
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/masuk/i).click();

    // Wait for API calls
    cy.wait('@loginSuccess');
    cy.wait('@getProfile');

    // Verify redirect to homepage
    cy.url({timeout: 10000}).should('eq', `${Cypress.config().baseUrl}/`);

    // Verify user is logged in (check for user name or logout button)
    cy.contains(/test user|logout/i, {timeout: 10000}).should('be.visible');
  });
});
