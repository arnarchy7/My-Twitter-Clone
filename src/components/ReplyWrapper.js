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

function ReplyWrapper() {
  const { tweetId } = useParams();

  const [replyLikes, setReplyLikes] = useState({});

  const [replies, setReplies] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = async (e, id) => {
    const liked = e.currentTarget.checked;
    if (liked) {
      try {
        await axios.post(`https://localhost:7212/api/likedreplies/`, { replyId: id, userId: 6 });
        setReplyLikes({ ...replyLikes, [id]: liked });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.delete(`https://localhost:7212/api/likedreplies/replyid/${id}`);
        setReplyLikes({ ...replyLikes, [id]: liked });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCount = async (e, id) => {
    try {
      const replyIndex = replies.findIndex((reply) => reply.id === id);

      const updatedReplies = [...replies];
      updatedReplies[replyIndex].likeCount = e.currentTarget.checked
        ? replies[replyIndex].likeCount + 1
        : replies[replyIndex].likeCount - 1;
      setReplies(updatedReplies);
      setReplyLikes({ ...replyLikes, [id]: e.currentTarget.checked });

      const payload = {
        likeCount: updatedReplies[replyIndex].likeCount,
        body: updatedReplies[replyIndex].body,
        retweetCount: updatedReplies[replyIndex].retweetCount,
        createdAt: updatedReplies[replyIndex].createdAt,
        userId: updatedReplies[replyIndex].userId,
        id: updatedReplies[replyIndex].id,
        tweetId: updatedReplies[replyIndex].tweetId,
      };
      await axios.put(`https://localhost:7212/api/replies/${id}`, payload, {
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
      const result = await axios.get(`https://localhost:7212/api/users/${userId}`);
      setUsers((prevUsers) => [...prevUsers, { userId: result.data.userId, ...result.data }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://localhost:7212/api/likedreplies/user/6`);
      const likedReplies = response.data;

      likedReplies.forEach((reply) => {
        replyLikes[reply.replyId] = true;
      });
      setReplyLikes(replyLikes);
    }
    fetchData();
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
          {replies.map((reply) => (
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
                  <p style={{ color: 'grey', fontSize: '14px ' }}>{`${reply.retweetCount || 0}`}</p>
                </Button>
                <ToggleButton
                  className={replyLikes[reply.id] ? 'PressedHeartButton' : 'HeartButton'}
                  id={reply.id}
                  type="checkbox"
                  checked={replyLikes[reply.id]}
                  value="1"
                  onChange={(e) => handleChangeAndCount(e, reply.id)}
                >
                  <HeartFill size={16} style={{ width: '40px' }} />
                  <p style={{ color: 'grey', fontSize: '14px ' }}>{`${reply.likeCount || 0}`}</p>
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
