const router = require('express').Router();
const { green, red } = require('chalk');
const { User, Pool } = require('../db/models');
const axios = require('axios');
module.exports = router;
