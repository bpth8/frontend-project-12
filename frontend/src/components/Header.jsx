import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logOut();
    navigate('/login');
  };

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        {}
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        
        {}
        {auth.loggedIn && (
          <Button onClick={handleLogout} variant="primary">
            {t('header.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;