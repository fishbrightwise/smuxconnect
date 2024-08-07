// This is a config file to hold any secret information/keys that you don't want to expose to the public.
// Here we keep the Firebase API key, which is used to authenticate requests to the Firebase Realtime Database.
// Remember to add this file to your .gitignore so that it is not pushed to GitHub.

// Then, for use, we call this key in our JavaScript files via this line: config.API_KEY
// This referrence back here for the necessary key.
// Naturally, we need to declare this config file in our HTML files before any other JavaScript files that use it.
// <script type="text/javascript" src="./js/config.js"></script> 
var config = {
    API_KEY: "YOUR ACTUAL KEY WILL GO HERE"
};
// Then, remember to rename this .js file to config.js instead of config_template.js.