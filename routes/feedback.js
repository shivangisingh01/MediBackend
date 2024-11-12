const express = require("express");
const router = express.Router();
const {fbc} = require("../controllers/feedbController");

router.post("/back", 
    (req, res) => {
    // Your route logic here
    res.send('Response');
}
// fbc
);

module.exports = router;