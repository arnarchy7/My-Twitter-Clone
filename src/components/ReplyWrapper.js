import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

import { Container, Row, Col, Image, Button, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import { Chat, HeartFill, Recycle } from 'react-bootstrap-icons';
import axios from 'axios';
import moment from 'moment';

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

function ReplyWrapper() {
  const { tweetId } = useParams();

  const [tweetLikes, setTweetLikes] = useState({});
  const handleChange = (e, id) => {
    setTweetLikes({ ...tweetLikes, [id]: e.currentTarget.checked });
  };

  const [replies, setReplies] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getReplies = async () => {
    try {
      const result = await axios.get(`https://localhost:7212/api/replies/tweet/${tweetId}`);
      setReplies(result.data);
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
    getReplies();
  }, []);

  const memoizedUsers = useMemo(() => {
    const usersMap = {};
    users.forEach((user) => {
      usersMap[user.userId] = user;
    });
    replies.forEach((reply) => {
      if (!usersMap[reply.userId]) {
        getUser(reply.userId);
        usersMap[reply.userId] = true;
      }
    });
    return usersMap;
  }, [replies, users]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Wrapper>
          {[...replies].reverse().map((reply) => (
            <Card key={ReplyWrapper.id}>
              {Object.values(memoizedUsers).map(
                (user) =>
                  user.userId === reply.userId && (
                    <Row key={reply.createdAt}>
                      <Col xs={1} style={{ padding: 0 }}>
                        <Image src={user.imageURL} roundedCircle fluid />
                      </Col>
                      <Col>
                        <Row style={{ margin: 0, height: '20px' }}>
                          <p>
                            <span style={{ fontWeight: 'bold' }}>{user.displayName}</span>{' '}
                            <span style={{ color: 'grey', fontSize: '15px' }}>
                              @{user.handle} - {moment(reply.createdAt).format('Do MMM YYYY')}{' '}
                            </span>
                          </p>
                        </Row>
                        <Row style={{ margin: 0 }}>
                          <p>
                            <span style={{ fontSize: '15px' }}>{reply.body}</span>
                          </p>
                        </Row>
                      </Col>
                    </Row>
                  )
              )}

              <Row style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <Button className="IconButton">
                  <Chat size={16} />
                </Button>
                <Button className="IconButton">
                  <Recycle size={16} />
                </Button>
                <ToggleButton
                  className={tweetLikes[reply.id] ? 'PressedHeartButton' : 'HeartButton'}
                  id={reply.id}
                  type="checkbox"
                  checked={tweetLikes[reply.id]}
                  value="1"
                  onChange={(e) => handleChange(e, reply.id)}
                >
                  <HeartFill size={16} style={{ width: '40px' }} />
                </ToggleButton>
              </Row>
            </Card>
          ))}
        </Wrapper>
      </Row>
    </Container>
  );
}

export default ReplyWrapper;
