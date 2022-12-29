import React, { useState, useEffect, useMemo } from 'react';
import '../App.css';

import { Container, Row, Col, Image, Button, ToggleButton, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
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

function TweetWrapper() {
  const [tweetLikes, setTweetLikes] = useState({});
  const handleChange = (e, id) => {
    setTweetLikes({ ...tweetLikes, [id]: e.currentTarget.checked });
  };

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (tweet) => {
    setShow(true);
    setModalData(tweet);
  };

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

  const getUser = async (userId) => {
    try {
      // eslint-disable-next-line no-template-curly-in-string
      const result = await axios.get(`https://localhost:7212/api/users/${userId}`);
      setUsers((prevUsers) => [...prevUsers, { userId: result.data.userId, ...result.data }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const memoizedUsers = useMemo(() => {
    const usersMap = {};
    users.forEach((user) => {
      usersMap[user.userId] = user;
    });
    tweets.forEach((tweet) => {
      if (!usersMap[tweet.userId]) {
        getUser(tweet.userId);
        usersMap[tweet.userId] = true;
      }
    });
    return usersMap;
  }, [tweets, users]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Wrapper>
          {[...tweets].reverse().map((tweet) => (
            <Card key={tweet.id}>
              <NavLink className="NavLinkCard" to={`/tweet/${tweet.id}`}>
                {Object.values(memoizedUsers).map(
                  (user) =>
                    user.userId === tweet.userId && (
                      <Row key={tweet.tweetCreated}>
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
                        </Col>
                      </Row>
                    )
                )}
              </NavLink>
              <Row style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <Button className="IconButton" onClick={() => handleShow(tweet)}>
                  <Chat size={16} />
                </Button>
                <Button className="IconButton">
                  <Recycle size={16} />
                </Button>
                <ToggleButton
                  className={tweetLikes[tweet.id] ? 'PressedHeartButton' : 'HeartButton'}
                  id={tweet.id}
                  type="checkbox"
                  checked={tweetLikes[tweet.id]}
                  value="1"
                  onChange={(e) => handleChange(e, tweet.id)}
                >
                  <HeartFill size={16} style={{ width: '40px' }} />
                </ToggleButton>
              </Row>
            </Card>
          ))}
        </Wrapper>
      </Row>

      <Modal show={show} onHide={handleClose} tweet={modalData}>
        <Modal.Header closeButton />
        <Modal.Body>
          <Container>
            {Object.values(memoizedUsers).map(
              (user) =>
                user.userId === modalData.userId && (
                  <Row>
                    <Col xs={1} style={{ padding: 0 }}>
                      <Image src={user.imageURL} roundedCircle fluid />
                    </Col>
                    <Col>
                      <Row style={{ margin: 0, height: '20px' }}>
                        <p>
                          <span style={{ fontWeight: 'bold' }}>{user.displayName}</span>{' '}
                          <span style={{ color: 'grey', fontSize: '15px' }}>
                            @{user.handle} - {moment(modalData.tweetCreated).format('Do MMM YYYY')}{' '}
                          </span>
                        </p>
                      </Row>
                      <Row style={{ margin: 0 }}>
                        <p>
                          <span style={{ fontSize: '15px' }}>{modalData.tweetBody}</span>
                        </p>
                      </Row>
                    </Col>
                  </Row>
                )
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Comment tweetId={modalData.id} />{' '}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TweetWrapper;
