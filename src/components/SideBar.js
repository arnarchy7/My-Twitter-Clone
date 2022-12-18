import React from 'react';
import '../App.css';
import { Container, Row, Col, Form, InputGroup, Image, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import styled from 'styled-components';
import profilePic from '../assets/default_profile.png';

const WhoToFollowCard = styled.div`
  border: rgb(239, 243, 244) 1px solid;
  border-radius: 15px;
  background-color: rgb(239, 243, 244);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  //margin-bottom: 0.5rem;
  width: 100%;
`;

function SideBar() {
  return (
    <Container>
      <br />
      <Row>
        <Col>
          <InputGroup className="sm-3">
            <InputGroup.Text id="basic-addon2">
              <Search size={16} style={{ color: 'grey' }} />
            </InputGroup.Text>
            <Form.Control className="SearchForm" placeholder="Search" />
          </InputGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <WhoToFollowCard>
            <h6>Who To Follow</h6>
            <Row>
              <Col xs={1}>
                <Image src={profilePic} roundedCircle />
              </Col>
              <Col style={{ marginLeft: '20px' }}>
                <Row style={{ margin: 0, height: '20px' }}>
                  <span style={{ fontWeight: 'bold', paddingRight: '0' }}>Elon Musk</span>{' '}
                  <span style={{ color: 'grey', fontSize: '15px' }}>@ElonMusk</span>
                </Row>
              </Col>
              <Col>
                <Button className="FollowButton">Follow</Button>
              </Col>
            </Row>
          </WhoToFollowCard>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
