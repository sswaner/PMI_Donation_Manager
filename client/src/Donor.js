import React from "react";
import { useTranslation } from 'react-i18next';

const Donor = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <h1>{t('donor account')}</h1>

            <form>
            {/*maybe change labels to headings for accesibility*/}
                <div className="form-column">
                    <div className="form-name">
                        <div>
                            <label htmlFor="name">{t("name")}
                                <input type="text" id="name" name="name" />
                            </label> 
                        </div>

                        <div>
                            <label htmlFor="giving potential">{t("giving potential")}
                                <input type="text" id="giving potential" name="giving potential" />
                            </label> 
                        </div>

                        <div>
                            <label htmlFor="prior donations">{t("prior donations")}
                                <input type="text" id="prior donations" name="prior donations" />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="primary location">{t("primary location")}
                                <input type="text" id="primary location" name="primary location" />
                            </label>
                        </div>
                    </div>

                    <div className="form-select">
                        <label htmlFor="segment">{t("segment")}
                            <select id="segment" name="segment">
                                <option value="">{t("select segment")}</option>
                                <option value="manufacturing">{t("manufacturing")}</option>
                                {/* Add other languages as needed */}
                            </select>
                        </label>
                        <label htmlFor="account manager">{t("account manager")}
                            <select id="account manager" name="account manager">
                                <option value="">-- {t("select")} {t("manager")} --</option>
                            </select>
                        </label>
                        <div>
                            <label htmlFor="SIKAP ID">{t("SIKAP ID")}
                                <input type="text" id="SIKAP ID" name="SIKAP ID" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes">{t("notes")}</label>
                        <textarea id="notes" name="notes" rows="10" cols="50"></textarea>
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

            <div>
            
            </div>
        </div>
    );
};

export default Donor;