import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function OrderEntry() {
  const navigate = useNavigate();
  const [orderDetails] = useOrderDetails();

  const summaryHandler = (e) => {
    e.preventDefault();
    navigate('/summary');
  };

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
        onClick={summaryHandler}
      >
        Submit Order
      </Button>
    </div>
  );
}
