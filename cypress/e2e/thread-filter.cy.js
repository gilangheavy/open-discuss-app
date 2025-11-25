/**
 * - Thread Filter spec - WINDOW.FETCH STUBBING APPROACH
 *   - New Strategy: Stub fetch DIRECTLY before any app code runs
 *   - This bypasses Redux middleware and any other layers
 */

describe('Thread Filter spec', () => {
  beforeEach(() => {
    cy.log('🔧 STUBBING window.fetch DIRECTLY...');

    // Load fixture data
    cy.fixture('threads.json').then((threadsData) => {
      cy.fixture('users.json').then((usersData) => {

        // Visit with onBeforeLoad to stub fetch BEFORE app initializes
        cy.visit('/', {
          onBeforeLoad(win) {
            // Clear localStorage
            win.localStorage.clear();

            // STUB window.fetch directly
            cy.stub(win, 'fetch').callsFake((url, options) => {
              cy.log(`🎣 STUBBED FETCH CALLED: ${url}`);

              // Match /v1/threads
              if (url.includes('/v1/threads')) {
                cy.log('✅ Returning MOCKED threads data');
                return Promise.resolve({
                  ok: true,
                  json: () => Promise.resolve(threadsData),
                });
              }

              // Match /v1/users
              if (url.includes('/v1/users')) {
                cy.log('✅ Returning MOCKED users data');
                return Promise.resolve({
                  ok: true,
                  json: () => Promise.resolve(usersData),
                });
              }

              // For any other URL, call real fetch
              cy.log(`⚠️ URL not matched, calling real fetch: ${url}`);
              return win.fetch.wrappedMethod(url, options);
            }).as('fetchStub');
          },
        });

        // Wait for page to load and React to render
        cy.log('⏳ Waiting for app to initialize with MOCKED data...');
        cy.wait(2000); // Give time for Redux thunk to complete

        cy.log('✅ App should now have MOCKED data loaded!');
      });
    });
  });

  it('should display category filter buttons', () => {
    cy.log('TEST: Verifying category buttons with STUBBED data');

    // Verify "Semua" button exists
    cy.contains('button', 'Semua', {timeout: 10000}).should('be.visible');

    // Verify category buttons from FIXTURE data
    cy.contains('button', '#React').should('be.visible');
    cy.contains('button', '#Redux').should('be.visible');
    cy.contains('button', '#JavaScript').should('be.visible');

    cy.log('✅ All category buttons visible!');
  });

  it('should filter threads by selected category', () => {
    cy.log('TEST: Filter functionality with STUBBED data');

    // Initially should show all 6 threads (from fixture)
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 6);

    // Click React category filter
    cy.contains('button', '#React').click();

    // Should only show 3 React threads (from fixture)
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 3);

    // Verify correct React threads from FIXTURE are visible
    cy.contains('Belajar React Hooks').should('be.visible');
    cy.contains('Advanced React Patterns').should('be.visible');
    cy.contains('React Performance Tips').should('be.visible');

    cy.log('✅ Filter working!');
  });

  it('should show all threads when "Semua" is clicked', () => {
    cy.log('TEST: Reset filter functionality');

    // Click a category filter first
    cy.contains('button', '#Redux').click();
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 2);

    // Click "Semua" to reset filter
    cy.contains('button', 'Semua').click();

    // Should show all 6 threads again
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 6);

    cy.log('✅ Reset working!');
  });

  it('should handle single thread category', () => {
    cy.log('TEST: Single-category filter');

    // Click JavaScript category (only 1 thread in fixture)
    cy.contains('button', '#JavaScript').click();

    // Should show exactly 1 thread
    cy.get('article, [data-testid="thread-item"]')
      .should('have.length', 1);

    // Verify correct thread from FIXTURE is visible
    cy.contains('Tips JavaScript ES6').should('be.visible');

    cy.log('✅ Single-category working!');
  });
});
