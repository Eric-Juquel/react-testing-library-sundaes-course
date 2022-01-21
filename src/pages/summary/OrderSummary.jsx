import { useLocation } from 'react-router-dom';
import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Col } from 'react-bootstrap';

const OrderSummary = () => {
  const location = useLocation();
  console.log(location.pathname);

  const [orderDetails] = useOrderDetails();
  console.log(orderDetails.scoops);

  const scoopsArray = Array.from(orderDetails.scoops.entries());
  const toppingsArray = Array.from(orderDetails.toppings.keys());

  return (
    <Col lg={12} style={{ padding: '2rem' }}>
      <h1>Order Summary</h1>
      <h2>Scoops</h2>
      <ul>
        {scoopsArray.map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>
      <br />
      <h2>Toppings</h2>
      <ul>
        {toppingsArray.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
      <hr style={{ width: '50%' }} />
      <h2>Total: {orderDetails.totals.grandTotal} $</h2>

      <SummaryForm />
    </Col>
  );
};

export default OrderSummary;
