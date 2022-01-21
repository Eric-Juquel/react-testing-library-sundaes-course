import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';

function App() {
  return (
    <Container fluid>
      <Router>
        <OrderDetailsProvider>
          <Routes>
            <Route path="/" element={<OrderEntry />} />
            <Route path="/summary" element={<OrderSummary />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
          </Routes>
        </OrderDetailsProvider>
      </Router>
    </Container>
  );
}

export default App;
