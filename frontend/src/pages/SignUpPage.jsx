import { useTranslation } from 'react-i18next';
import Container from '../components/CommonComponentsForPages/Container';
import registrationImage from '../assets/registrationImage.jpg';
import RegistrationForm from '../components/CommonComponentsForPages/RegistrationForm';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <img src={registrationImage} alt={t('image.signup')} className="img-fluid" />
        </div>
        <RegistrationForm />
      </div>
    </Container>
  );
};

export default SignUpPage;
