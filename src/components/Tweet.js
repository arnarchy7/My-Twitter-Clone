import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import { Container, Row, Col, Image, Button, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import moment from 'moment';
import ReplyWrapper from './ReplyWrapper';
import ReplyForm from './ReplyForm';

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

function Tweet() {
  const [tweetLikes, setTweetLikes] = useState({});
  const handleChange = (e, id) => {
    setTweetLikes({ ...tweetLikes, [id]: e.currentTarget.checked });
  };

  const { tweetId } = useParams();

  const [tweet, setTweet] = useState([]);
  const [user, setUser] = useState([]);

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

  useEffect(() => {
    getTweet();
  }, []);

  useEffect(() => {
    getUser();
  }, [tweet]);

  return (
    <Container className="Main-Col">
      <Row>
        <div>
          <h3>Tweet</h3>
          <br />
        </div>
      </Row>

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
      ) : (
        <div>Loading...</div>
      )}

      <Card>
        <ReplyForm />
      </Card>
      <ReplyWrapper />
    </Container>
  );
}

export default Tweet;
