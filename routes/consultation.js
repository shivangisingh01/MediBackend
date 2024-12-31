const express = require('express');
const { makeConsultation, checkConsultation} = require('../controllers/consultationController');
const router = express.Router();

// Route to track a new consultation
router.post("/user/:userId/doctor/:doctorId", makeConsultation);

// Route to check if it’s the first consultation
router.get("/user/:userId/doctor/:doctorId", checkConsultation);

module.exports = router;
