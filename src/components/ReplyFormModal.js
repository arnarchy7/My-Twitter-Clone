import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

function ReplyFormModal(props) {
  ReplyFormModal.propTypes = {
    tweetId: PropTypes.number.isRequired,
  };
  const { tweetId } = props;
  const [Body, setBody] = useState('');

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async () => {
    if (Body !== '') {
      try {
        const payload = {
          Body,
          userId: 6,
          createdAt: new Date(),
          tweetId,
        };
        await axios.post('https://localhost:7212/api/replies', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        window.location.reload();
      } catch (error) {
        console.error(error.response);
      }
    }
  };

  return (
    <Col>
      <Row>
        <Form.Control
          type="input"
          placeholder="Tweet your reply"
          fluid="true"
          value={Body}
          onChange={handleChange}
        />
      </Row>
      <br />
      <Row
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button className="TweetButton" onClick={handleSubmit}>
          Reply
        </Button>
      </Row>
    </Col>
  );
}

export default ReplyFormModal;
