<h1>TradeMe-Manager App</h1>

<h2>About App</h2>
This is Trademe Manager App.
It uses Trademe API 

<h2>Feafures</h2>
1. Login with cunsumer key <br />
2. Create a listing <br />
3. Edit listing <br />
4. Current Selling list <br />
5. Current Watchlist <br />
6. Unsold Item list <br />
7. Sold item list <br />
8. Profile  <br />

<h2>How to create consumer & consumer secrect key </h2>
1. visit https://www.tmsandbox.co.nz/MyTradeMe/Api/DeveloperOptions.aspx <br />
2. create new API key by clicking `Register a new application` <br />
3. put Callback Domains as `hosting domain/login` or `localhost/login`
4. Create API
5. use consumer key and consumer secret key to login

<h2>How To Use</h2>

Login with your API consumer key and consumer secret key. 

Manage your trademe listing

<h2>Development</h2>
use the development branch for develop purpose 
or
replace the `constant/config.js` `BASE_URL` && `BASE_URL_SECURE` to `https://api.tmsandbox.co.nz/v1` && `https://secure.tmsandbox.co.nz` 
tmsandbox(dev server) 
`npm install`


1. copy the code and clone
2. `npm install`
3. create `.env` file
4. define the variable `NODE_MAILER_PASSWORD`
6. `npm run dev`
7. enjoy the App

