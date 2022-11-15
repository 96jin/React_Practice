"use strict";

const express = require('express');
const router = express.Router();
// router 를 사용하려면 express의 Router를 불러와야함

const ctrl = require('./home.ctrl')
router.get('/', ctrl.home)

router.get('/login', ctrl.login)

module.exports = router