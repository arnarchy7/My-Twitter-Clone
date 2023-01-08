import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';

function TweetForm() {
  const [tweetBody, setTweetBody] = useState('');
  const [mainUser, setMainUser] = useState([]);

  const getMainUser = async () => {
    const result = await axios.get(`https://localhost:7212/api/users/6`);
    setMainUser(result.data);
  };

  useEffect(() => {
    getMainUser();
  }, []);

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
    <Container>
      <Row>
        <Col xs={1} style={{ padding: 0 }}>
          <Image src={mainUser.imageURL} roundedCircle fluid />
        </Col>
        <Col>
          <Form.Control
            type="input"
            placeholder="What's happening?"
            fluid="true"
            value={tweetBody}
            onChange={handleChange}
          />
        </Col>
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
    </Container>
  );
}

export default TweetForm;
