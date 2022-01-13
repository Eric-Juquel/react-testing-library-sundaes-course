import { render, screen, fireEvent } from '@testing-library/react';
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
        name: 'I agree to Terms and Conditions'
    })
    expect(checkbox).toBeInTheDocument();
})

test('checkbox is initialy unchecked and button initialy enabled', () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole('checkbox', {
        name: 'I agree to Terms and Conditions'
    })
    const button = screen.getByRole('button', {
        name: 'Confirm order',
      });
    expect(checkbox).not.toBeChecked()
    expect(button).toBeDisabled()
})

test('button disabled when checkbox is checked', () => {
    const checkbox = screen.getByRole('checkbox', {
        name: 'I agree to Terms and Conditions'
    })
    const button = screen.getByRole('button', {
        name: 'Confirm order',
      });
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeEnabled()
})
