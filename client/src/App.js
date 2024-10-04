import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Save the user's language preference
  };

  return (
    <div>
      <div className="tab-container">
        <div className="tab-nav">
          <button onClick={() => handleTabChange('portfolio')}>{t('portfolio')}</button>
          <button onClick={() => handleTabChange('account')}>{t('account')}</button>
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
          <button onClick={() => changeLanguage('en')}>{t('language change en')}</button>
          <button onClick={() => changeLanguage('id')}>{t('language change id')}</button>
          <h1>{t('greeting')}</h1>

          <form>
            <div className="form-column">
              <div className="form-name">
                <div>
                  <label htmlFor="name">{t("name")}
                    <input type="text" id="name" name="name" />
                  </label>
                  
                </div>

                <div>
                  <label htmlFor="preferredName">{t("preferredName")}
                    <input type="text" id="preferredName" name="preferredName" />
                  </label>
                  
                </div>
              </div>

              <div className="form-address">
                <h2>{t("address")}</h2>
                <div>
                  <label htmlFor="jalan">{t("jalan")}
                    <input type="text" id="address" name="address" />
                  </label>
                </div>

                <div>
                  <label htmlFor="no.">{t("no.")}
                    <input type="text" id="no" name="no" />
                  </label>
                </div>

                <div>
                  <label htmlFor="city">{t("city")}
                    <input type="text" id="city" name="city" />
                  </label>
                </div>

                <div>
                  <label htmlFor="province">{t("province")}
                    <select id="province" name="province">
                      <option value="">{t("select province")}</option>
                      <option value="jakarta">{t("jakarta")}</option>
                      <option value="westJava">{t("westJava")}</option>
                      <option value="centralJava">{t("centralJava")}</option>
                      <option value="eastJava">{t("eastJava")}</option>
                      {/* Add other provinces as needed */}
                    </select>
                  </label>
                </div>

                <div>
                  <label htmlFor="postalCode">{t("postalCode")}
                    <input type="text" id="postalCode" name="postalCode" />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-lead">
                <label htmlFor="leadStatus">{t("leadStatus")}
                  <select id="leadStatus" name="leadStatus">
                    <option value="">{t("select status")}</option>
                    <option value="contacted">{t("contacted")}</option>
                    <option value="qualified">{t("qualified")}</option>
                    <option value="future outreach">{t("future outreach")}</option>
                    <option value="unqualified">{t("unqualified")}</option>
                    {/* Add other lead statuses as needed */}
                  </select>
                </label>
              </div>

              <div className="form-contact">
              <h2>{t("contact")}</h2>
                <div>
                  <label htmlFor="emailPreferred">{t("email")}
                    <input type="email" id="email" name="email" />
                    <div className="checkbox-group">
                      <input type="checkbox" id="emailPreferred" name="emailPreferred" /> {t('preferred')}
                    </div>
                  </label>
                </div>

                <div>
                  <label htmlFor="mobile">{t("mobile")}
                    <input type="text" id="mobile" name="mobile" />
                    <div className="checkbox-group">
                      <input type="checkbox" id="mobilePreferred" name="mobilePreferred"/> {t('preferred')}
                    </div>
                  </label>
                </div>

                <div>
                  <label htmlFor="organization">{t("organization")}
                    <input type="text" id="organization" name="organization" />
                  </label>
                  
                </div>

                <div>
                  <label htmlFor="position">{t("position")}
                    <input type="text" id="position" name="position" />
                  </label>
                  
                </div>
              </div>
            </div>
            {/*add on click to submit form */}
            <div className='save-button'>
              <button type="submit">{t("save")}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
