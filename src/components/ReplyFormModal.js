import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

function ReplyFormModal(props) {
  ReplyFormModal.propTypes = {
    tweetId: PropTypes.number.isRequired,
  };
  const { tweetId } = props;
  const [Body, setBody] = useState('');
  const [mainUser, setMainUser] = useState([]);

  const getMainUser = async () => {
    const result = await axios.get(`https://localhost:7212/api/users/6`);
    setMainUser(result.data);
  };

  useEffect(() => {
    getMainUser();
  }, []);

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
    <Container>
      <Row>
        <Col xs={1} style={{ padding: 0 }}>
          <Image src={mainUser.imageURL} roundedCircle fluid />
        </Col>
        <Col>
          <Form.Control
            type="input"
            placeholder="Tweet your reply"
            fluid="true"
            value={Body}
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
          Reply
        </Button>
      </Row>
    </Container>
  );
}

export default ReplyFormModal;
