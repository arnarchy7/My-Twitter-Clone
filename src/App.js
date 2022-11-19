import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

import SideMenu from './components/SideMenu';
import Home from './components/Home';
import Explore from './components/Explore';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Container>
          <Row className="App">
            <Col sm={3}>
              <SideMenu />
            </Col>
            <Col sm={6}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Col>
            <Col sm={3} />
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
