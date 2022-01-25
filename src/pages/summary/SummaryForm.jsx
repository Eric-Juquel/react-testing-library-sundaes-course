import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, OverlayTrigger, Popover } from 'react-bootstrap';

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase('completed');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Col style={{ margin: '2rem auto' }}>
        <Form.Group controlId="terms-and-conditions">
          <Form.Check
            type="checkbox"
            checked={tcChecked}
            onChange={(e) => setTcChecked(e.target.checked)}
            label={checkboxLabel}
          />
        </Form.Group>
      </Col>
      <br />
      <Button variant="outline-light" type="submit" disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
