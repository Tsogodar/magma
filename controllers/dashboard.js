const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.render(`dashboard/dashboard.hbs`, {name : 'dashboard'});
});


module.exports = router;