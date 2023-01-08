import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HouseHeartFill, Hash, Bell, Envelope, Bookmarks, Person } from 'react-bootstrap-icons';
import logo from '../assets/TwitterLogo.png';

function SideMenuSmall() {
  return (
    <div>
      <Container fluid>
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
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/explore">
                  <Hash size={30} />
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/notifications">
                  <Bell size={30} />
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/messages">
                  <Envelope size={30} />
                </NavLink>
              </Col>
            </Row>
            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/bookmarks">
                  <Bookmarks size={30} />
                </NavLink>
              </Col>
            </Row>

            <Row className="Row-SideBar">
              <Col>
                <NavLink className="NavLink" to="/profile">
                  <Person size={30} />
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SideMenuSmall;
