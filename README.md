# SMUX Connect
Welcome to SMUX Connect!
This is a personal project that I have created in the hopes of having it approved for an Alumni Networking Event held by Singapore Management Universty's SMUXploration Crew.

# Technologies used:
Front End:
- HTML
- CSS: Materialize.css
- JavaScript: Basic JS, Crypto.js for Password Validation, HTML5 QR, 
Back End:
- Database: Google Firebase Realtime Database
- Web Hosting: Google Firebase Web App Hosting
- REST API: Axios

# Features:
- Standard Login/Register with Validation and Password Encryption.
- Realtime updating "Bingo Board" to track event progress.
- Integrated QR Scanner for Event-only QR Codes.
- In-built personalized QR Code for Event-onl use.

# Web App Walkthrough:
- User will register an account on the Web App, and proceed to login via Email Address and chosen Password.
- Once on the logged-in home page, they will be presented with the "Bingo Board" for theiir viewing pleasure, indicating their progress during the event.
- To participate in the event, users will utilize the QR Scanner provided to scan other participant's QR Code when connecting with them in-person.
- Once successful, an icebreaker question will be prompted to them for them to ask, if they need it. Otherwise, participants are free to chat as they wish with their connected counterpart(s).
- Points are accumulated for each unique scan, which will also check off "Bingo Squares" on the "Bingo Board".

# To be determined/fixed:
- What prize or end goal the points/completion of the "Bingo Board" entails.
- Theme-related visuals for the "Bingo Board".
- Issue with the "Bingo Board": Points collected are not uniform and are based on type of "Bingo Square" instead.
- Issue with QR Scanner: On presentation of QR Code, performs multiple scans and hence, multiple Axios requests within seconds, quickly prompting the "Already Scanned this QR Code" validation.