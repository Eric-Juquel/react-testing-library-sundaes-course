import { useState } from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();
  const [isDisabled, setIsDisabled] = useState(true);

  const scoopsArray = Array.from(orderDetails.scoops.entries());
  const numberOfScoops = scoopsArray.reduce(
    (acc, [key, value]) => acc + value,
    0
  );

  useEffect(() => {
    if (numberOfScoops === 0) {
      setIsDisabled(true);
    } else setIsDisabled(false);
  }, [numberOfScoops]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Design Your Sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {orderDetails.totals.grandTotal} $</h2>
      <br />
      <Button
        variant="outline-light"
        style={{ margin: '1rem auto' }}
        onClick={() => setOrderPhase('review')}
        disabled={isDisabled}
      >
        Submit Order
      </Button>
    </div>
  );
}
