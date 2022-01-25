import {
  render,
  screen,
  waitFor,
} from '../../../test-utils/testing-library-utils';

import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoop and topping routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test.only('submit button is disabled until a scoop is selected', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const submitBtn = await screen.findByRole('button', {
    name: /submit order/i,
  });
  expect(submitBtn).toBeDisabled();

  // add ice cream scoop and check button is enabled
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(submitBtn).toBeEnabled()

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(submitBtn).toBeEnabled()

  // switch back all scoop to none and check button
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '0');
  expect(submitBtn).toBeDisabled()

});
