const express = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');
const router = express.Router();

router.use(express.json());

router.use('/user', userRouter);
router.use('/account',accountRouter);

module.exports = router;