const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(`core/dashboard/posts/add.hbs`, {layout: 'dashboard'});
});


module.exports = router;