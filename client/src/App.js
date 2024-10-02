import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t('greeting')}</h1>
      <button onClick={() => changeLanguage('en')}>{t('language change en')}</button>
      <button onClick={() => changeLanguage('id')}>{t('language change id')}</button>
    </div>
  );
};

export default App;
