/**
 * - Thread Interaction spec
 *   - should display comments and vote buttons correctly on thread detail page
 *   - should allow user to add a comment to a thread
 *   - should prevent unauthenticated user from adding a comment
 *   - should allow user to upvote a thread
 *   - should allow user to downvote a thread
 *   - should allow user to neutral-vote a thread
 *   - should allow user to upvote a comment
 *   - should allow user to downvote a comment
 */

describe('Thread Interaction spec', () => {
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
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@test.com',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    },
  ];

  beforeEach(() => {
    // Mock user profile FIRST
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: mockUsers[0],
        },
      },
    });

    // Mock users list
    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          users: mockUsers,
        },
      },
    });

    // Mock thread detail
    cy.intercept('GET', '**/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: mockThreadDetail,
        },
      },
    }).as('getThreadDetail');
  });

  it('should display comments and vote buttons correctly on thread detail page', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');
    // Verify thread content
    cy.contains('Test Thread Title').should('be.visible');
    cy.contains('This is the thread content for testing').should('be.visible');
    cy.contains('#React').should('be.visible');

    // Verify thread vote buttons (using aria-label)
    cy.get('[aria-label="Upvote"]').should('have.length.at.least', 2);
    cy.get('[aria-label="Downvote"]').should('have.length.at.least', 2);

    // Verify comments section
    cy.contains('Komentar (1)').should('be.visible');
    cy.contains('Great thread!').should('be.visible');
  });

  it('should allow user to add a comment to a thread', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');

    // Mock add comment API
    cy.intercept('POST', '**/threads/thread-1/comments', {
      statusCode: 201,
      body: {
        status: 'success',
        data: {
          comment: {
            id: 'comment-2',
            content: 'New test comment',
            createdAt: new Date().toISOString(),
            owner: mockUsers[0],
            upVotesBy: [],
            downVotesBy: [],
          },
        },
      },
    }).as('addComment');

    // Fill comment textarea
    cy.get('textarea[placeholder*="komentar"]').type('New test comment');

    // Submit comment (button has title="Kirim Komentar")
    cy.get('button[title="Kirim Komentar"]').click();

    // Wait for API call
    cy.wait('@addComment');

    // Verify new comment appears
    cy.contains('Komentar (2)').should('be.visible');
    cy.contains('New test comment').should('be.visible');
  });

  it('should prevent unauthenticated user from adding a comment', () => {
    // This test needs different setup - skip beforeEach
    cy.intercept('GET', '**/users/me', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Missing authentication',
      },
    });

    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('token');
      },
    });

    // Should redirect to login
    cy.url().should('include', '/login');
  });

  it('should allow user to upvote a thread', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');

    // Mock upvote API
    cy.intercept('POST', '**/threads/thread-1/up-vote', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          vote: {
            id: 'vote-1',
            userId: 'user-1',
            threadId: 'thread-1',
            voteType: 1,
          },
        },
      },
    }).as('upvoteThread');

    // Click upvote button (first one is for thread)
    cy.get('[aria-label="Upvote"]').first().click();

    // Wait for API call
    cy.wait('@upvoteThread');

    // Verify upvote button state changed
    cy.get('[aria-label="Upvote"]').first().should('have.class', 'text-primary');
  });

  it('should allow user to downvote a thread', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');

    // Mock downvote API
    cy.intercept('POST', '**/threads/thread-1/down-vote', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          vote: {
            id: 'vote-2',
            userId: 'user-1',
            threadId: 'thread-1',
            voteType: -1,
          },
        },
      },
    }).as('downvoteThread');

    // Click downvote button (first one is for thread)
    cy.get('[aria-label="Downvote"]').first().click();

    // Wait for API call
    cy.wait('@downvoteThread');

    // Verify downvote button state changed
    cy.get('[aria-label="Downvote"]').first().should('have.class', 'text-destructive');
  });

  it('should allow user to neutral-vote a thread', () => {
    // Start with thread already upvoted
    const upvotedThread = {
      ...mockThreadDetail,
      upVotesBy: ['user-1'],
    };

    cy.intercept('GET', '**/threads/thread-1', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          detailThread: upvotedThread,
        },
      },
    }).as('getUpvotedThread');

    // Mock neutral vote API
    cy.intercept('POST', '**/threads/thread-1/neutral-vote', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          vote: {
            id: 'vote-3',
            userId: 'user-1',
            threadId: 'thread-1',
            voteType: 0,
          },
        },
      },
    }).as('neutralVoteThread');

    // Reload page with upvoted state
    cy.reload();
    cy.wait('@getUpvotedThread');

    // Click upvote button again to neutralize
    cy.get('[aria-label="Upvote"]').first().click();

    // Wait for API call
    cy.wait('@neutralVoteThread');

    // Verify button returns to neutral state
    cy.get('[aria-label="Upvote"]').first().should('not.have.class', 'text-primary');
  });

  it('should allow user to upvote a comment', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');

    // Mock upvote comment API
    cy.intercept('POST', '**/threads/thread-1/comments/comment-1/up-vote', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          vote: {
            id: 'vote-4',
            userId: 'user-1',
            commentId: 'comment-1',
            voteType: 1,
          },
        },
      },
    }).as('upvoteComment');

    // Click upvote button for comment (second set)
    cy.get('[aria-label="Upvote"]').eq(1).click();

    // Wait for API call
    cy.wait('@upvoteComment');

    // Verify comment upvote button state changed
    cy.get('[aria-label="Upvote"]').eq(1).should('have.class', 'text-primary');
  });

  it('should allow user to downvote a comment', () => {
    // Set token and visit
    cy.visit('/threads/thread-1', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'mock-jwt-token');
      },
    });
    cy.wait('@getThreadDetail');

    // Mock downvote comment API
    cy.intercept('POST', '**/threads/thread-1/comments/comment-1/down-vote', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          vote: {
            id: 'vote-5',
            userId: 'user-1',
            commentId: 'comment-1',
            voteType: -1,
          },
        },
      },
    }).as('downvoteComment');

    // Click downvote button for comment (second set)
    cy.get('[aria-label="Downvote"]').eq(1).click();

    // Wait for API call
    cy.wait('@downvoteComment');

    // Verify comment downvote button state changed
    cy.get('[aria-label="Downvote"]').eq(1).should('have.class', 'text-destructive');
  });
});
