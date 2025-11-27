/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should not navigate when password is less than 6 characters
 *   - should navigate to login page when registration is successful
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register page correctly', () => {
    // Verify register page elements
    cy.get('input[type="text"]#name').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button', /daftar/i).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    // Click register without filling name
    cy.contains('button', /daftar/i).click();

    // Verify validation message (browser validation)
    cy.get('input[type="text"]#name').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('should display alert when email is empty', () => {
    // Fill name but not email
    cy.get('input[type="text"]#name').type('Test User');
    cy.contains('button', /daftar/i).click();

    // Verify email validation
    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('should display alert when password is empty', () => {
    // Fill name and email but not password
    cy.get('input[type="text"]#name').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.contains('button', /daftar/i).click();

    // Verify password validation
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  });

  it('should not navigate when password is less than 6 characters', () => {
    // Fill all fields with short password
    cy.get('input[type="text"]#name').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('12345'); // 5 characters
    cy.contains('button', /daftar/i).click();

    // Wait a bit to ensure no navigation happens
    cy.wait(1000);

    // URL should still be /register (most reliable check)
    cy.url().should('include', '/register');
  });

  it('should navigate to login page when registration is successful', () => {
    // Intercept register API call and return success
    cy.intercept('POST', '**/register', {
      statusCode: 201,
      body: {
        status: 'success',
        message: 'User created',
        data: {
          user: {
            id: 'user-test-123',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Test+User',
          },
        },
      },
    }).as('registerSuccess');

    // Fill all fields correctly
    cy.get('input[type="text"]#name').type('Test User');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', /daftar/i).click();

    // Wait for API call
    cy.wait('@registerSuccess');

    // Verify redirect to login page
    cy.url({timeout: 10000}).should('include', '/login');
  });

  it('should display error when registration fails', () => {
    // Intercept register API call and return error
    cy.intercept('POST', '**/register', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'Email is already taken',
      },
    }).as('registerFail');

    // Fill all fields
    cy.get('input[type="text"]#name').type('Test User');
    cy.get('input[type="email"]').type('existing@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', /daftar/i).click();

    // Wait for API call
    cy.wait('@registerFail');

    // Verify error message appears
    cy.contains(/email is already taken/i, {timeout: 10000}).should('be.visible');
  });
});
