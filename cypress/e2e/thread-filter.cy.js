/**
 * - Thread Filter spec
 *   - should display category filter buttons
 *   - should filter threads by selected category
 *   - should show all threads when "Semua" is clicked
 *   - should handle single thread category
 */

describe('Thread Filter spec', () => {
  it('should display category filter buttons', () => {
    cy.log('Setting up intercepts for test 1...');

    // Setup intercepts IMMEDIATELY before visit
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      fixture: 'users.json',
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      fixture: 'threads.json',
    }).as('getThreads');

    cy.log('Visiting homepage...');
    cy.visit('/');

    cy.log('Waiting for mocked API calls...');
    cy.wait('@getThreads', {timeout: 10000});
    cy.wait('@getUsers', {timeout: 10000});

    cy.log('Verifying category buttons...');

    // Verify "Semua" button exists
    cy.contains('button', 'Semua', {timeout: 10000}).should('be.visible');

    // Verify category buttons exist (from fixture data)
    cy.contains('button', '#React').should('be.visible');
    cy.contains('button', '#Redux').should('be.visible');
    cy.contains('button', '#JavaScript').should('be.visible');
  });

  it('should filter threads by selected category', () => {
    cy.log('Setting up intercepts for test 2...');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      fixture: 'users.json',
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      fixture: 'threads.json',
    }).as('getThreads');

    cy.visit('/');
    cy.wait('@getThreads', {timeout: 10000});
    cy.wait('@getUsers', {timeout: 10000});

    cy.log('Filtering by React category...');

    // Initially should show all 6 threads
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 6);

    // Click React category filter
    cy.contains('button', '#React').click();

    // Should only show 3 React threads
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 3);

    // Verify correct React threads are visible
    cy.contains('Belajar React Hooks').should('be.visible');
    cy.contains('Advanced React Patterns').should('be.visible');
    cy.contains('React Performance Tips').should('be.visible');
  });

  it('should show all threads when "Semua" is clicked', () => {
    cy.log('Setting up intercepts for test 3...');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      fixture: 'users.json',
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      fixture: 'threads.json',
    }).as('getThreads');

    cy.visit('/');
    cy.wait('@getThreads', {timeout: 10000});
    cy.wait('@getUsers', {timeout: 10000});

    cy.log('Testing Semua button reset...');

    // Click a category filter first
    cy.contains('button', '#Redux').click();
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 2);

    // Click "Semua" to reset filter
    cy.contains('button', 'Semua').click();

    // Should show all 6 threads again
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 6);
  });

  it('should handle single thread category', () => {
    cy.log('Setting up intercepts for test 4...');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      fixture: 'users.json',
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      fixture: 'threads.json',
    }).as('getThreads');

    cy.visit('/');
    cy.wait('@getThreads', {timeout: 10000});
    cy.wait('@getUsers', {timeout: 10000});

    cy.log('Testing single category (JavaScript)...');

    // Click JavaScript category (only 1 thread in fixture)
    cy.contains('button', '#JavaScript').click();

    // Should show exactly 1 thread
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 1);

    // Verify correct thread is visible
    cy.contains('Tips JavaScript ES6').should('be.visible');
  });
});
