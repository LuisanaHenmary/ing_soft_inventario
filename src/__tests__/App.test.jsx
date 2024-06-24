import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './../App';

describe('App', () => {
  it('feature tour', async () => {
    render(<App />);

    screen.getByRole('heading', {
      name: /vite \+ react/i
    });

    const counterButton = screen.getByRole('button', {
      name: /count is 0/i
    });

    expect(counterButton).toBeInTheDocument();
    expect(counterButton).toHaveTextContent('count is 0');

    fireEvent.click(counterButton);
    screen.getByText('count is 1');
  });
});
