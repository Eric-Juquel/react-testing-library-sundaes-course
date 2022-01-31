import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScoopOption from '../ScoopOption';

test('scoop option input become red on invalid input', () => {
  render(<ScoopOption name="Vanilla" imagePath="" updateItemCount={jest.fn()} />);

  //expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  //expect input to be invalid with floatnumber
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '2.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  //expect input to be invalid with to high number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '11');
  expect(vanillaInput).toHaveClass('is-invalid');

  //expect input to be invalid with valid number
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '3');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
