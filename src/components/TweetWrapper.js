import React, { useState, useEffect, useMemo } from 'react';
import '../App.css';

import { Container, Row, Col, Image, Button, ToggleButton, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import axios from 'axios';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import ReplyFormModal from './ReplyFormModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  padding: 0px;
  width: 100%;
`;

const Card = styled.div`
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  &:hover {
    background-color: rgb(239, 243, 244);
  }
`;

function TweetWrapper() {
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
  const [tweetLikes, setTweetLikes] = useState({});

  const [tweetReplies, setTweetReplies] = useState({});

  const updateTweetReplies = (newReplies) => {
    setTweetReplies((prevReplies) => ({ ...prevReplies, ...newReplies }));
  };

  const fetchReplies = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7212/api/replies/tweet/${id}`);
      const replies = response.data;
      updateTweetReplies({ [id]: replies.length });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e, id) => {
    const liked = e.currentTarget.checked;
    if (liked) {
      try {
        await axios.post(`https://localhost:7212/api/likedtweets/`, { tweetId: id, userId: 6 });
        setTweetLikes({ ...tweetLikes, [id]: liked });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.delete(`https://localhost:7212/api/likedtweets/tweet/${id}`);
        setTweetLikes({ ...tweetLikes, [id]: liked });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCount = async (e, id) => {
    try {
      const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

      const updatedTweets = [...tweets];
      updatedTweets[tweetIndex].likeCount = e.currentTarget.checked
        ? tweets[tweetIndex].likeCount + 1
        : tweets[tweetIndex].likeCount - 1;
      setTweets(updatedTweets);
      setTweetLikes({ ...tweetLikes, [id]: e.currentTarget.checked });

      const payload = {
        likeCount: updatedTweets[tweetIndex].likeCount,
        tweetBody: updatedTweets[tweetIndex].tweetBody,
        retweetCount: updatedTweets[tweetIndex].retweetCount,
        tweetCreated: updatedTweets[tweetIndex].tweetCreated,
        userId: updatedTweets[tweetIndex].userId,
        id: updatedTweets[tweetIndex].id,
      };
      await axios.put(`https://localhost:7212/api/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeAndCount = (e, id) => {
    handleChange(e, id);
    handleCount(e, id);
  };

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
      const result = await axios.get(`https://localhost:7212/api/users/${userId}`);
      setUsers((prevUsers) => [...prevUsers, { userId: result.data.userId, ...result.data }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    tweets.forEach((tweet) => {
      fetchReplies(tweet.id);
    });
  }, [tweets]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://localhost:7212/api/likedtweets/user/6`);
      const likedTweets = response.data;

      likedTweets.forEach((tweet) => {
        tweetLikes[tweet.tweetId] = true;
      });
      setTweetLikes(tweetLikes);
    }
    fetchData();
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
    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
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
                  <p style={{ color: 'grey', fontSize: '14px ' }}>{`${
                    tweetReplies[tweet.id] || 0
                  }`}</p>
                </Button>
                <Button className="IconButton">
                  <Recycle size={16} />
                  <p style={{ color: 'grey', fontSize: '14px ' }}>{`${tweet.retweetCount || 0}`}</p>
                </Button>
                <ToggleButton
                  className={tweetLikes[tweet.id] ? 'PressedHeartButton' : 'HeartButton'}
                  id={tweet.id}
                  type="checkbox"
                  checked={tweetLikes[tweet.id]}
                  value="1"
                  onChange={(e) => handleChangeAndCount(e, tweet.id)}
                >
                  <HeartFill size={16} style={{ width: '40px' }} />
                  <p style={{ color: 'grey', fontSize: '14px ' }}>{`${tweet.likeCount || 0}`}</p>
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
          <ReplyFormModal tweetId={modalData.id} />{' '}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TweetWrapper;
