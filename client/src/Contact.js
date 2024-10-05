import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t, i18n } = useTranslation();
    return (   
        <div>
            <h1>{t('contact detail')}</h1>
            <form>
                {/*maybe change labels to headings for accesibility*/}
                <div className="form-column">
                    <div className="form-name">
                        <div>
                            <label htmlFor="f.name">{t("f.name")}
                                <input type="text" id="f.name" name="name" />
                            </label> 
                        </div>

                        <div>
                            <label htmlFor="l.name">{t("l.name")}
                                <input type="text" id="l.name" name="name" />
                            </label> 
                        </div>

                        <div>
                            <label htmlFor="role/title">{t("role/title")}
                                <input type="text" id="role/title" name="role/title" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <input type="checkbox" id="do not contact" name="do not contact" /> 
                        <label htmlFor="do not contact">{t("do not contact")}</label>
                    </div>

                    <div>
                        <label htmlFor="donor account">{t("donor account")}</label>
                        <a href="">account</a>
                    </div>

                    <div className="form-contact">
                        <div>
                            <label htmlFor="official email">{t("official email")}
                                <input type="email" id="official email" name="official email" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="official phone">{t("official phone")}
                                <input type="text" id="official phone" name="official phone" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="personal email">{t("personal email")}
                                <input type="email" id="personal email" name="personal email" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="personal phone">{t("personal phone")}
                                <input type="text" id="personal phone" name="personal phone" />
                            </label>
                        </div>                
                    </div>

                    <div className="form-select">
                        <label htmlFor="preferred language">{t("preferred language")}
                            <select id="preferred language" name="preferred language">
                                <option value="">{t("select language")}</option>
                                <option value="en">{t("en")}</option>
                                <option value="id">{t("id")}</option>
                                {/* Add other languages as needed */}
                            </select>
                        </label>
                        <label htmlFor="preferred method of contact">{t("preferred method of contact")}
                            <select id="preferred method of contact" name="preferred method of contact">
                                <option value="">{t("select method")}</option>
                                <option value="official email">{t("official email")}</option>
                                <option value="personal email">{t("personal email")}</option>
                                <option value="official phone">{t("official phone")}</option>
                                <option value="personal phone">{t("personal phone")}</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <input type="checkbox" id="active contact" name="active contact" /> 
                        <label htmlFor="active contact">{t("active contact")}</label>
                    </div>

                    <div>
                        <label htmlFor="contact notes">{t("contact notes")}</label>
                        <textarea id="contact notes" name="contact notes" rows="10" cols="50"></textarea>
                    </div>

                    <div>
                        <label htmlFor="created">{t("created")}</label>
                    </div>

                    <div>
                        <label htmlFor="modified">{t("modified")}</label>
                    </div>

                    <div>
                        <label htmlFor="created">{t("created")} {t("by")}</label>
                    </div>

                    <div>
                        <label htmlFor="modified">{t("modified")} {t("by")}</label>
                    </div>

                </div>

                {/*add on click to submit form */}
                <div className='save-button'>
                    <button type="submit">{t("save")}</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;