import React, { useState, useEffect } from 'react';
import '../App.css';

import { Container, Row, Col, Image, Form, Button, ToggleButton, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import axios from 'axios';
import moment from 'moment';
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

  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTweets = async () => {
    try {
      const result = await axios.get('https://localhost:7212/api');
      setTweets(result.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (tweetId) => {
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const result = await axios.get(`https://localhost:7212/api/users/${tweetId}`);
      setUsers((prevUsers) => [...prevUsers, result.data]);
      // console.log(userResult.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    tweets.forEach((tweet) => {
      getUser(tweet.id);
    });
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
              <Image src={profilePic} roundedCircle fluid />
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
          {[...tweets].reverse().map((tweet) => (
            <Card key={tweet.id}>
              {users.map(
                (user) =>
                  user.userId === tweet.userId && (
                    <Row key={user.userId}>
                      <Col xs={1} style={{ padding: 0 }}>
                        <Image src={user.imageURL} roundedCircle fluid />
                      </Col>
                      <Col>
                        <Row style={{ margin: 0, height: '20px' }}>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>{user.displayName}</span>{' '}
                            <span style={{ color: 'grey', fontSize: '15px' }}>
                              @{user.handle} - {moment(tweet.tweetCreated).format('Do MMM YYYY')}{' '}
                            </span>
                          </p>
                        </Row>
                        <Row style={{ margin: 0 }}>
                          <p>
                            <span style={{ fontSize: '15px' }}>{tweet.tweetBody}</span>
                          </p>
                        </Row>
                        <Row
                          style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}
                        >
                          <Button className="IconButton" onClick={handleShow}>
                            <Chat size={16} />
                          </Button>
                          <Button className="IconButton">
                            <Recycle size={16} />
                          </Button>
                          <ToggleButton
                            className={checked ? 'PressedHeartButton' : 'HeartButton'}
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
                  )
              )}
            </Card>
          ))}
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
                      I know I believe in nothing. But it is my nothing.
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
