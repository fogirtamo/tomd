import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CommentsList from './CommentsList';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('CommentsList UI Tests', () => {
  it('renders the correct DOM structure with comments', () => {
    const store = mockStore({
      user: {
        comments: [
          {
            date: '2025-04-17',
            nickname: 'User1',
            formattedDate: 'April 17, 2025',
            comment: 'This is a test comment',
          },
        ],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    );

    // Отладочный вывод
    console.log(container.innerHTML);

    // Проверяем, что элементы рендерятся
    const commentsList = container.querySelector('.commentsList');
    const comment = container.querySelector('.comment');

    expect(commentsList).not.toBeNull();
    expect(commentsList).toBeInTheDocument();
    expect(comment).not.toBeNull();
    expect(comment).toBeInTheDocument();
  });

  it('renders no comments when the list is empty', () => {
    const store = mockStore({
      user: {
        comments: [],
      },
    });

    const { container } = render(
      <Provider store={store}>
        <CommentsList />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});