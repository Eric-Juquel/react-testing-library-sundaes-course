import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesInput);

  // find and click order button
  const submitBtn = await screen.findByRole('button', {
    name: /submit order/i,
  });
  userEvent.click(submitBtn);

  // check summary information based on order
  const summaryTitle = await screen.findByRole('heading', {
    name: /order summary/i,
  });
  expect(summaryTitle).toBeInTheDocument();

  const scoopsTitle = await screen.findByRole('heading', { name: /scoops/i });
  expect(scoopsTitle).toBeInTheDocument();

  const toppingsTitle = await screen.findByRole('heading', { name: /scoops/i });
  expect(toppingsTitle).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  const grandTotal = await screen.findByText('Total: $', { exact: false });
  expect(grandTotal).toHaveTextContent('7.50');

  // accept terms and conditions and click button to confirm order
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  userEvent.click(checkbox);

  // confirm order number on confirmation page
  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });
  expect(confirmOrderButton).toBeEnabled();
  userEvent.click(confirmOrderButton);

  //expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //check confirmation page test
  const confirmationTitle = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(confirmationTitle).toBeInTheDocument();

  // click "new order" button on confirmation page
  const newButton = screen.getByRole('button', {
    name: /create a new order/i,
  });
  userEvent.click(newButton);

  const entryTitle = await screen.findByRole('heading', {
    name: /Design Your Sundae/i,
  });
  expect(entryTitle).toBeInTheDocument();

  // check that scoops and toopings subtotals have been reset
  const scoopsSubtotal = await screen.findByText('Scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  const toppingsSubtotal = await screen.findByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Topping headers is not on the screen Order Summary when user did not select any', async () => {
  render(<App />);

  // add ice cream scoops and no toppings
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  // find and click order button
  const submitBtn = screen.getByRole('button', {
    name: /submit order/i,
  });
  userEvent.click(submitBtn);

  // check toppings did not appear on summary
  const toppings = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppings).not.toBeInTheDocument();
});
