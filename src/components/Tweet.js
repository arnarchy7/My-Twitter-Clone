import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import '../App.css';
import { Container, Row, Col, Image, Button, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { Chat, HeartFill, Recycle, ArrowLeft } from 'react-bootstrap-icons';
import moment from 'moment';
import ReplyWrapper from './ReplyWrapper';
import ReplyForm from './ReplyForm';

const Card = styled.div`
  border-bottom: rgb(239, 243, 244) 1px solid;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
`;

function Tweet() {
  const { tweetId } = useParams();

  const [tweet, setTweet] = useState([]);
  const [user, setUser] = useState([]);
  const [tweetReplies, setTweetReplies] = useState({});
  const [tweetLikes, setTweetLikes] = useState({});
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
        await axios.delete(`https://localhost:7212/api/likedtweets/tweet/${tweetId}`);
        setTweetLikes({ ...tweetLikes, [id]: liked });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCount = async (e, id) => {
    try {
      const updatedTweet = { ...tweet };
      updatedTweet.likeCount = e.currentTarget.checked ? tweet.likeCount + 1 : tweet.likeCount - 1;
      setTweet(updatedTweet);
      setTweetLikes({ ...tweetLikes, [id]: e.currentTarget.checked });

      const payload = {
        likeCount: updatedTweet.likeCount,
        tweetBody: updatedTweet.tweetBody,
        retweetCount: updatedTweet.retweetCount,
        tweetCreated: updatedTweet.tweetCreated,
        userId: updatedTweet.userId,
        id: updatedTweet.id,
      };
      await axios.put(`https://localhost:7212/api/${tweetId}`, payload, {
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

  const getTweet = async () => {
    try {
      const result = await axios.get(`https://localhost:7212/api/${tweetId}`);
      setTweet(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const result = await axios.get(`https://localhost:7212/api/users/${tweet.userId}`);
      setUser(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReplies = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7212/api/replies/tweet/${tweetId}`);
      const replies = response.data;
      setTweetReplies({ [id]: replies.length });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTweet();
  }, []);

  useEffect(() => {
    getUser();
  }, [tweet]);

  useEffect(() => {
    fetchReplies(tweet.id);
  }, [tweet]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://localhost:7212/api/likedtweets/user/6`);
      const likedTweets = response.data;

      likedTweets.forEach((tweetlike) => {
        tweetLikes[tweetlike.tweetId] = true;
      });
      setTweetLikes(tweetLikes);
    }
    fetchData();
  }, []);

  return (
    <Container className="Main-Col">
      <Row>
        <div>
          <span style={{ display: 'flex' }}>
            <NavLink className="NavLinkBack" to="/">
              <ArrowLeft size={25} style={{ marginTop: '4px' }} />
            </NavLink>
            <h3 style={{ paddingLeft: '10px' }}>Tweet</h3>
          </span>

          <br />
        </div>
      </Row>
      <Row>
        {tweet ? (
          <Card key={tweet.id}>
            <Row>
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

            <Row style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
              <Button className="IconButton">
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
                <HeartFill size={16} />
                <p style={{ color: 'grey', fontSize: '14px ' }}>{`${tweet.likeCount || 0}`}</p>
              </ToggleButton>
            </Row>
          </Card>
        ) : (
          <div>Loading...</div>
        )}
      </Row>
      <Row>
        <Card>
          <ReplyForm />
        </Card>
      </Row>
      <Row>
        <ReplyWrapper />
      </Row>
    </Container>
  );
}

export default Tweet;
