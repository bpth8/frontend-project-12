import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{t('loading.text')}</span>
    </Spinner>
  );
};

export default Loading;
