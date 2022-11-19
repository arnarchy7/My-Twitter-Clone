import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  HouseHeartFill,
  Hash,
  Bell,
  Envelope,
  Bookmarks,
  // FileEarmarkText,
  Person,
} from 'react-bootstrap-icons';
import logo from '../assets/TwitterLogo.png';

function SideMenu() {
  return (
    <div>
      <Container>
        <Row className="App">
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
            {/* <Row className="Row-SideBar">
                  <Col>
                    <NavLink className="NavLink" to="/lists">
                      <FileEarmarkText size={30} />
                      <h5>Lists</h5>
                    </NavLink>
                  </Col>
                </Row> */}
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/profile">
                  <Person size={30} />
                  <h5>Profile</h5>
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SideMenu;
