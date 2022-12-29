import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function TweetForm() {
  const [tweetBody, setTweetBody] = useState('');

  const handleChange = (event) => {
    setTweetBody(event.target.value);
  };

  const handleSubmit = async () => {
    if (tweetBody !== '') {
      try {
        const payload = {
          tweetBody,
          userId: 6,
          tweetCreated: new Date(),
        };
        await axios.post('https://localhost:7212/api', payload, {
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
          placeholder="What's happening?"
          fluid="true"
          value={tweetBody}
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
          Tweet
        </Button>
      </Row>
    </Col>
  );
}

export default TweetForm;
