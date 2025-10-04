import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../customHooks/useAuth';
import routes from '../../routes/routes';

const MainLayout = ({ children }) => {
  const { t } = useTranslation();
  const { loggedIn, logOut } = useAuth();

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm bg-white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">{t('mainLayout.title')}</Navbar.Brand>
          {loggedIn && (
            <Link
              onClick={logOut}
              to={routes.loginPagePath()}
              type="button"
              className="btn btn-primary"
            >
              {t('mainLayout.exitButton')}
            </Link>
          )}
        </Container>
      </Navbar>
      {children}
    </div>
  );
};

export default MainLayout;
