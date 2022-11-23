import React, { useState } from 'react';
import '../App.css';

import { Container, Row, Col, Image, Form, Button, ToggleButton, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import profilePic from '../assets/default_profile.png';
import Comment from './Comment';

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [checked, setChecked] = useState(false);

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
              <Image src={profilePic} roundedCircle />
            </Col>
            <Col>
              <Row>
                <Form.Control type="input" placeholder="What's happening?" />
              </Row>
              <br />
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button className="TweetButton">Tweet</Button>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
      <Row>
        <Wrapper>
          <Card>
            <Row>
              <Col xs={1} style={{ padding: 0 }}>
                <Image src={profilePic} roundedCircle />
              </Col>
              <Col>
                <Row style={{ margin: 0, height: '20px' }}>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Arnar Jón</span>{' '}
                    <span style={{ color: 'grey', fontSize: '15px' }}>@ArnarJon - Nov 19</span>
                  </p>
                </Row>
                <Row style={{ margin: 0 }}>
                  <p>
                    <span style={{ fontSize: '15px' }}>
                      {' '}
                      Bla bla bla bla bal bbla yakety yak bull. Haltu kjafti
                    </span>
                  </p>
                </Row>
                <Row style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <Button className="IconButton" onClick={handleShow}>
                    <Chat size={16} />
                  </Button>

                  <Button className="IconButton">
                    <Recycle size={16} />
                  </Button>

                  {/*
                  <svg style={{ height: '24px', width: '48px' }}>
                    <g>
                      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                    </g>
              </svg> */}
                  <ToggleButton
                    className={checked ? 'HeartButton' : 'PressedHeartButton'}
                    id="toggle-check"
                    type="checkbox"
                    checked={checked}
                    value="1"
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  >
                    <HeartFill size={16} style={{ width: '40px' }} />
                  </ToggleButton>
                </Row>
              </Col>
            </Row>
          </Card>
        </Wrapper>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={1} style={{ padding: 0 }}>
                <Image src={profilePic} roundedCircle />
              </Col>
              <Col>
                <Row style={{ margin: 0, height: '20px' }}>
                  <p>
                    <span style={{ fontWeight: 'bold' }}>Arnar Jón</span>{' '}
                    <span style={{ color: 'grey', fontSize: '15px' }}>@ArnarJon - Nov 19</span>
                  </p>
                </Row>
                <Row style={{ margin: 0 }}>
                  <p>
                    <span style={{ fontSize: '15px' }}>
                      {' '}
                      Bla bla bla bla bal bbla yakety yak bull. Haltu kjafti
                    </span>
                  </p>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Comment />{' '}
          <Button className="TweetButton" onClick={handleClose}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Home;
