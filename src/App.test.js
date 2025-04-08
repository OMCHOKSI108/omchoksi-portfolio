import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Om Choksi text', () => {
  render(<App />);
  const textElement = screen.getByText(/Om Choksi/i);
  expect(textElement).toBeInTheDocument();
});