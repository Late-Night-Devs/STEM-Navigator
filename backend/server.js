// activate .env variables
require('dotenv').config();
// express server
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');
const app = express();

// auth0 
const { auth } = require('express-oauth2-jwt-bearer');
const guard = require("express-jwt-permissions")();



const port = process.env.PORT || 3000;

const jwtCheck = auth({
    audience: 'https://www.steam-api.com',
    issuerBaseURL: 'https://dev-lkzdxicdd2p4o70p.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
// enforce on all endpoints
app.use(jwtCheck);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// path: http://backend_URL/${routes}
app.use('/', routes);

app.get('/authorized', guard.check(['read:users']), (req, res) => {
    res.send('Secured Resource');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
