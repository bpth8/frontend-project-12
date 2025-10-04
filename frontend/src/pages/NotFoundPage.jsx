import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImage404 from '../assets/404NotFoundImage.jpg';
import routes from '../routes/routes.js';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={notFoundImage404} alt={t('image.NotFound')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        <Link to={routes.mainPagePath()}>{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
