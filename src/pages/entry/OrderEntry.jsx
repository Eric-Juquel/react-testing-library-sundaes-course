import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

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
      >
        Submit Order
      </Button>
    </div>
  );
}
