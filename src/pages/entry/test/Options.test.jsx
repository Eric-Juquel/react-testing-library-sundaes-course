import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  //find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm all text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  //find images
  const topingImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(topingImages).toHaveLength(3);

  //confirm all text of images
  const altText = topingImages.map((el) => el.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
