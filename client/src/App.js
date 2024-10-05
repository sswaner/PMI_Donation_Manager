import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Donor from "./Donor";
import Contact from "./Contact";
import Account from "./Account";
import './App.css';

const App = () => {
  const { t, i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState('donor account'); // Default tab

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Save the user's language preference
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab); // Update current tab
  };

  return (
    <div>
      <div className="tab-container">
        <div className="tab-nav">
          <button onClick={() => handleTabChange('donor account')}>{t('donor account')}</button>
          <button onClick={() => handleTabChange('account manage')}>{t('account manage')}</button>
          <button onClick={() => handleTabChange('contact detail')}>{t('contact detail')}</button>
          <button onClick={() => handleTabChange('portfolio')}>{t('portfolio')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('account add')}>{t('account add')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('account search')}>{t('account search')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('account report')}>{t('account report')}</button>
          <button onClick={() => handleTabChange('donation')}>{t('donation')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('donation search')}>{t('donation search')}</button>
          <button onClick={() => handleTabChange('campaign')}>{t('campaign')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('campaign manage')}>{t('campaign manage')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('campaign list')}>{t('campaign list')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('campaign add')}>{t('campaign add')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('campaign report')}>{t('campaign report')}</button>
          <button onClick={() => handleTabChange('event')}>{t('event')}</button>
          <button className="sub-tab" onClick={() => handleTabChange('event view')}>{t('event view')}</button>
        </div>        

        <div className="tab-content">
          <div>
            <button onClick={() => changeLanguage('en')}>{t('language change en')}</button>
            <button onClick={() => changeLanguage('id')}>{t('language change id')}</button>
          </div>

          {currentTab === 'donor account' && <Donor />}
          {currentTab === 'account manage' && <Account />}
          {currentTab === 'contact detail' && <Contact />}

        </div>        
      </div>
    </div>
  );
};

export default App;
