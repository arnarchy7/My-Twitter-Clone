import React from 'react';
import '../App.css';

import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import TweetForm from './TweetForm';
import TweetWrapper from './TweetWrapper';

const Card = styled.div`
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

function Home() {
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
            <TweetForm />
          </Row>
        </Card>
      </Row>
      <TweetWrapper />
    </Container>
  );
}

export default Home;
