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
                      <option value="Aceh">{t("Aceh")}</option>
                      <option value="Bali">{t("Bali")}</option>
                      <option value="Bangka Belitung Islands">{t("Bangka Belitung Islands")}</option>
                      <option value="Banten">{t("Banten")}</option>
                      <option value="Bengkulu">{t("Bengkulu")}</option>
                      <option value="Central Java">{t("Central Java")}</option>
                      <option value="Central Kalimantan">{t("Central Kalimantan")}</option>
                      <option value="Central Sulawesi">{t("Central Sulawesi")}</option>
                      <option value="East Java">{t("East Java")}</option>
                      <option value="East Kalimantan">{t("East Kalimantan")}</option>
                      <option value="East Nusa Tenggara">{t("centralJava")}</option>
                      <option value="eastJava">{t("eastJava")}</option>
                      <option value="Gorontalo">{t("Gorontalo")}</option>
                      <option value="Jakarta">{t("Jakarta")}</option>
                      <option value="Jambi">{t("Jambi")}</option>
                      <option value="Lampung">{t("Lampung")}</option>
                      <option value="Maluku">{t("Maluku")}</option>
                      <option value="North Kalimantan">{t("North Kalimantan")}</option>
                      <option value="North Maluku">{t("North Maluku")}</option>
                      <option value="North Sulawesi">{t("North Sulawesi")}</option>
                      <option value="North Sumatra">{t("North Sumatra")}</option>
                      <option value="Papua">{t("Papua")}</option>
                      <option value="Riau">{t("Riau")}</option>
                      <option value="Riau Islands">{t("Riau Islands")}</option>
                      <option value="South Kalimantan">{t("South Kalimantan")}</option>
                      <option value="South Sulawesi">{t("South Sulawesi")}</option>
                      <option value="South Sumatra">{t("South Sumatra")}</option>
                      <option value="Southeast Sulawesi">{t("Southeast Sulawesi")}</option>
                      <option value="West Java">{t("West Java")}</option>
                      <option value="West Kalimantan">{t("West Kalimantan")}</option>
                      <option value="West Nusa Tenggara">{t("West Nusa Tenggara")}</option>
                      <option value="West Papua">{t("West Papua")}</option>
                      <option value="West Sulawesi">{t("West Sulawesi")}</option>
                      <option value="West Sumatra">{t("West Sumatra")}</option>
                      <option value="Yogyakarta">{t("Yogyakarta")}</option>
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