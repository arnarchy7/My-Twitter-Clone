import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HouseHeartFill, Hash, Bell, Envelope, Bookmarks, Person } from 'react-bootstrap-icons';
import logo from '../assets/TwitterLogo.png';
import TweetForm from './TweetForm';

function SideMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Row className="Row-SideBar">
              <Col>
                <img src={logo} className="App-icon" alt="logo" />
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/" activeclassname="active">
                  <HouseHeartFill size={30} />
                  <h5> Home</h5>
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/explore">
                  <Hash size={30} />
                  <h5>Explore</h5>
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/notifications">
                  <Bell size={30} />
                  <h5>Notifications</h5>
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/messages">
                  <Envelope size={30} />
                  <h5>Messages</h5>
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/bookmarks">
                  <Bookmarks size={30} />
                  <h5>Bookmarks</h5>
                </NavLink>
              </Col>
            </Row>

            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/profile">
                  <Person size={30} />
                  <h5>Profile</h5>
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Button className="TweetButtonSideMenu" onClick={handleShow}>
                Tweet
              </Button>
            </Row>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <TweetForm />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default SideMenu;
