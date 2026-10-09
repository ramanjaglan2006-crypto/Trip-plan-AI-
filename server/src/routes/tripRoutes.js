const express = require('express');
const { handleGenerateTrip } = require('../controllers/tripController');

const router = express.Router();

router.post('/generate', handleGenerateTrip);

module.exports = router;
