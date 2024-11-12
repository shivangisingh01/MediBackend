const express = require('express');
const {addDoc} =  require ('../controllers/doc.js');
const router = express.Router();
// CREATE
router.post("/add", addDoc);

module.exports = router;