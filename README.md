# Project Overview
This project focuses on building a centralized Resource Mobilization Database for PMI, enabling efficient tracking and management of donations from individuals and organizations. The app will support donor tracking, generate reports, and provide visual dashboards to monitor donation trends. It aims to streamline the entire donation management process, improve reporting accuracy, and support PMI’s long-term fundraising efforts.

## Key Concepts

 * Account
 * Contact
 * Donation
 * Activity
 * Campaign

## Screen Mockups
 * [Home Screen](./docs/home.png) Uses /user/{UserID}/accounts to populate the datagrid
 * [Account Screen](./docs/account.md)
 * [Contact Screen](./docs/contact.md)
 * [Donation Screen](./docs/donation.png)


## Built initial app:
 - cd client
 - npm init -y
 - npm install react react-dom
 - npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
 - created webpack.config.js
   - detailed how to deploy and added HtmlWebpackPlugin to connect to index.html
   - npm install --save-dev html-webpack-plugin
 - created .babelrc to give presets
 - created index.js to render app on website
 - created App.js, this is where the app that is put into index.html is built
 - To run first build with "npm run build", then "npm start"
   - Ctrl + C in terminal while running to close
 - changed index.html to have a div with an id of "root", this is where the app is put.
## Added language compatibility:
 - npm install i18next react-i18next
 - added jsons for en and id languages under src\locales\en & id
 - created i18n.js
   - connected languages to respective jsons
   - added getInitialLanguage() function to read browser and local storage for default language
     - There is a function commented out in case we want to give initial language to the node.js server
   - added changeLanguage(lng) function to App.js that also updates local storage's language
   - each element of text is written as {t('key tag')} and when the pages language is updated it pulls the text from the respective language's json
