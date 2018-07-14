const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.render(`core/dashboard/posts/all.hbs`, {layout:'dashboard'});
});


module.exports = router;