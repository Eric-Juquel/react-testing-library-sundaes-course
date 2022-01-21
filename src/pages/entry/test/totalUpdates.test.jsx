import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when topping is checked', async () => {
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // add Cherries topping and check subtotal
  const cherriesInput = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  expect(cherriesInput).not.toBeChecked();
  userEvent.click(cherriesInput);
  expect(cherriesInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // add M&Ms topping and check subtotal
  const mmsInput = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  expect(mmsInput).not.toBeChecked();
  userEvent.click(mmsInput);
  expect(mmsInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // remove Cherries topping and check subtotal
  userEvent.click(cherriesInput);
  expect(cherriesInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total update properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // ckeck grand total starts at $0.00
    expect(grandTotal).toHaveTextContent('0.00');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    // add cherries and check grand total
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    expect(cherriesInput).not.toBeChecked();
    userEvent.click(cherriesInput);
    expect(cherriesInput).toBeChecked();
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total update properly if topping is added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // add cherries and check grand total
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    expect(cherriesInput).not.toBeChecked();
    userEvent.click(cherriesInput);
    expect(cherriesInput).toBeChecked();
    expect(grandTotal).toHaveTextContent('1.50');

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    //add cheries
    const cherriesInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesInput);

    // update vanilla scoops to 2; grand total should be $5.50
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('5.50');

    // remove 1 scoop of vanilla and check grand total
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    //remove cherries and check grand total
    userEvent.click(cherriesInput);
    expect(cherriesInput).not.toBeChecked();
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
