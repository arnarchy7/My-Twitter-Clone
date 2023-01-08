import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
import SideBar from './components/SideBar';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';
import Tweet from './components/Tweet';
import SideMenuSmall from './components/SideMenuSmall';

function App() {
  return (
    <Router>
      <Container fluid>
        <Row className="App">
          <Col sm={1} className="d-none d-sm-block d-md-none">
            <SideMenuSmall />
          </Col>
          <Col md={3} className="d-none d-md-block">
            <SideMenu />
          </Col>
          <Col sm={10} md={9} lg={6}>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tweet/:tweetId" element={<Tweet />} />
              </Routes>
            </Scrollbars>
          </Col>
          <Col lg={3} className="d-none d-lg-block">
            <SideBar />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
