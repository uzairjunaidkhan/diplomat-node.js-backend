const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const MemberModel = require('./models/members');
require("dotenv").config();

const api = require('./api')

app.use(cors());
app.use(express.json()); //receive json in backend

app.use('/api', api)

app.listen(3001 || process.env.PORT, ()=> {
    console.log('on port 3001')
})