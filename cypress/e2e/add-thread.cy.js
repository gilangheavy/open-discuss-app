/**
 * - Add Thread spec
 *   - should display add thread page correctly
 *   - should display alert when title is empty
 *   - should display alert when body is empty
 *   - should add new thread and redirect to home page when form is submitted correctly
 */

describe('Add Thread spec', () => {
  beforeEach(() => {
    // Mock login session for authenticated routes
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'mock-jwt-token');
    });

    // Mock user profile for authenticated user
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-test-123',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Test+User',
          },
        },
      },
    });
  });

  it('should display add thread page correctly', () => {
    cy.visit('/add-thread');

    // Verify all form elements are visible
    cy.get('#title').should('be.visible');
    cy.get('#category').should('be.visible');
    cy.get('#body').should('be.visible');
    cy.contains('button', 'Buat Diskusi').should('be.visible');
  });

  it('should display alert when title is empty', () => {
    cy.visit('/add-thread');

    // Fill only category and body, leave title empty
    cy.get('#category').type('Test Category');
    cy.get('#body').type('Test thread content');

    // Try to submit
    cy.contains('button', 'Buat Diskusi').click();

    // Verify validation - browser will prevent submission
    // Check that we're still on /add-thread page (form not submitted)
    cy.url().should('include', '/add-thread');

    // Verify title field has required attribute or validation
    cy.get('#title').then(($input) => {
      // Check HTML5 validation
      const input = $input[0];
      expect(input.validity.valid).to.be.false;
    });
  });

  it('should display alert when body is empty', () => {
    cy.visit('/add-thread');

    // Fill only title and category, leave body empty
    cy.get('#title').type('Test Thread Title');
    cy.get('#category').type('Test Category');

    // Try to submit
    cy.contains('button', 'Buat Diskusi').click();

    // Verify validation - browser will prevent submission
    cy.url().should('include', '/add-thread');

    // Verify body field has required attribute or validation
    cy.get('#body').then(($textarea) => {
      const textarea = $textarea[0];
      expect(textarea.validity.valid).to.be.false;
    });
  });

  it('should add new thread and redirect to home page when form is submitted correctly', () => {
    // Mock successful thread creation
    cy.intercept('POST', '**/threads', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          thread: {
            id: 'thread-test-123',
            title: 'Test Thread Title',
            body: 'Test thread content for E2E testing',
            category: 'Testing',
            createdAt: '2025-01-01T00:00:00.000Z',
            ownerId: 'user-test-123',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        },
      },
    }).as('createThread');

    cy.visit('/add-thread');

    // Fill all form fields
    cy.get('#title').type('Test Thread Title');
    cy.get('#category').type('Testing');
    cy.get('#body').type('Test thread content for E2E testing');

    // Submit form
    cy.contains('button', 'Buat Diskusi').click();

    // Wait for API call
    cy.wait('@createThread');

    // Verify redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Note: Toast notification verification would go here if implemented
    // Example: cy.contains('Thread berhasil dibuat').should('be.visible');
  });
});
