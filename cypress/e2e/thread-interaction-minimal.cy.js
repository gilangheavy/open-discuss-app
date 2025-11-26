/**
 * MINIMAL TEST - Thread Interaction spec
 */

describe('Thread Interaction spec - MINIMAL', () => {
  const mockThreadDetail = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: 'This is the thread content for testing',
    category: 'React',
    createdAt: '2025-01-01T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@test.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Great thread!',
        createdAt: '2025-01-01T01:00:00.000Z',
        owner: {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@test.com',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  const mockUsers = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@test.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
  ];

  it('MINIMAL - should just load the page', () => {
    // Setup intercepts BEFORE visit
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: mockUsers[0],
        },
      },
    });

    cy.intercept('GET', '**/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThreadDetail,
        },
      },
    }).as('getThreadDetail');

    // Visit with token
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });

    // Wait for thread detail
    cy.wait('@getThreadDetail');

    // Just verify title is visible using h2
    cy.get('h2').contains('Test Thread Title').should('be.visible');
  });
});
