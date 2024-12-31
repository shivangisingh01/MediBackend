const express = require('express');
const {createAppointment} =  require ('../controllers/appointment');
// const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
// CREATE
// router.post("/book",authMiddleware, createAppointment);
router.post("/book", createAppointment);

module.exports = router;
