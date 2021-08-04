import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner, Container } from 'reactstrap';
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange } from './modules/authManager';
import Header from './components/Header';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }


  return (
    <Router>
      <Container className="mr-5">
        <Header position="absolute" isLoggedIn={isLoggedIn} />
      </Container>
      <Container>
        <ApplicationViews isLoggedIn={isLoggedIn} />
      </Container>
    </Router>
  );
}

export default App;
