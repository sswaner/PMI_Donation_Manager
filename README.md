# Austin's Additions
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

## Next Steps:
 - work on building login
   - get test accounts to login and future testing for access levels

# Shawn's Additions
## Node changes
 - reconfigured to use routes and controllers
 - cleaned up database connection (uses .env file in /api)
 - Added PUT and POST routes for contacts
 - Added swagger documentation at /api-docs (served on the Node API port 3000)
## Database
 - Added accountID 2 to the Accounts table

## Next Steps
 - Modify additionsl APIs to accept changes
 - More wireframes