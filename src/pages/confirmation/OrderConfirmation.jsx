import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios.post('http://localhost:3030/order').then((response) => {
      setOrderNumber(response.data.orderNumber);
    });
  }, []);

  const newOrderHandler = () => {
    resetOrder();
    setOrderPhase('inProgress')
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you!</h1>
      {orderNumber ? (
        <>
          <h3>Your order number is 1234567890</h3>
          <br />
          <p>as per our terms and conditions, nothing will happen now</p>
          <br />
        </>
      ) : (
        <p>issue with orderNumber</p>
      )}
      <Button variant="outline-light" onClick={newOrderHandler}>
        Create a new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
