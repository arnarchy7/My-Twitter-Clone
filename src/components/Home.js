import React, { useState, useEffect } from 'react';
import '../App.css';

import { Container, Row, Col, Image } from 'react-bootstrap';
import styled from 'styled-components';

import axios from 'axios';

import TweetForm from './TweetForm';
import TweetWrapper from './TweetWrapper';

const Card = styled.div`
  //border-top: rgb(239, 243, 244) 1px solid;
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  //margin-bottom: 0.5rem;
  width: 100%;
`;

function Home() {
  const [mainUser, setMainUser] = useState([]);

  const getMainUser = async () => {
    const result = await axios.get(`https://localhost:7212/api/users/6`);
    setMainUser(result.data);
  };

  useEffect(() => {
    getMainUser();
  }, []);

  return (
    <Container className="Main-Col">
      <Row>
        <div>
          <h3>Home</h3>
          <br />
        </div>
      </Row>
      <Row>
        <Card>
          <Row>
            <Col xs={1} style={{ padding: 0 }}>
              <Image src={mainUser.imageURL} roundedCircle fluid />
            </Col>
            <TweetForm />
          </Row>
        </Card>
      </Row>
      <TweetWrapper />
    </Container>
  );
}

export default Home;
