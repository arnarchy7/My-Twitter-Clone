import React, { useState, useEffect } from 'react';
import '../App.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
// import styled from 'styled-components';
// import { Chat, Heart, Recycle } from 'react-bootstrap-icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReplyFormModal from './ReplyFormModal';

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

function Comment(props) {
  Comment.propTypes = {
    tweetId: PropTypes.number.isRequired,
  };
  const { tweetId } = props;
  const [mainUser, setMainUser] = useState([]);

  const getMainUser = async () => {
    const result = await axios.get(`https://localhost:7212/api/users/6`);
    setMainUser(result.data);
  };

  useEffect(() => {
    getMainUser();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={1} style={{ padding: 0 }}>
          <Image src={mainUser.imageURL} roundedCircle fluid />
        </Col>
        <Col>
          <Row style={{ margin: 0 }}>
            <ReplyFormModal tweetId={tweetId} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Comment;
