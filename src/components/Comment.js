import React from 'react';
import '../App.css';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
// import styled from 'styled-components';
// import { Chat, Heart, Recycle } from 'react-bootstrap-icons';
import profilePic from '../assets/default_profile.png';

/* const Card = styled.div`
  //border-top: rgb(239, 243, 244) 1px solid;
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  //margin-bottom: 0.5rem;
  width: 100%;
`; */

function Comment() {
  return (
    <Container>
      <Row>
        <Col xs={1} style={{ padding: 0 }}>
          <Image src={profilePic} roundedCircle />
        </Col>
        <Col>
          <Row style={{ margin: 0 }}>
            <Form.Control type="text" placeholder="Tweet your reply" />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Comment;
