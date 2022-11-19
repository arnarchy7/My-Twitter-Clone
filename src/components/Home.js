import React from 'react';
import '../App.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import styled from 'styled-components';
import profilePic from '../assets/default_profile.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  padding: 0px;
`;

const Card = styled.div`
  border-top: rgb(239, 243, 244) 1px solid;
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding: 1.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
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
        <Wrapper>
          <Card>
            <Row>
              <Col xs={1} style={{ padding: 0 }}>
                <Image src={profilePic} roundedCircle />
              </Col>
              <Col>
                <Row style={{ margin: 0 }}>Name @name date</Row>
              </Col>
            </Row>
          </Card>
        </Wrapper>
      </Row>
    </Container>
  );
}

export default Home;
