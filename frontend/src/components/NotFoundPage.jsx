import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Вы можете перейти на <Link to="/">главную страницу</Link>
    </p>
  </div>
);
export default NotFoundPage;