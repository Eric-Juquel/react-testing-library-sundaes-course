import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

test('button has correct initial text', () => {
  render(<SummaryForm />);
  const button = screen.getByRole('button', {
    name: 'Confirm order',
  });
  expect(button).toBeInTheDocument();
});

test('checkbox has correct initial text', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).toBeInTheDocument();
});

test('checkbox is initialy unchecked and button initialy enabled', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', {
    name: 'Confirm order',
  });
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('button enabled when checkbox is checked and disabled when unchecked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const button = screen.getByRole('button', {
    name: 'Confirm order',
  });

  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('popover respond to hover', async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mousehover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
