const express = require('express');
const router = express.Router();

router.get('/:postId', (req, res) => {
res.render(`core/dashboard/posts/remove.hbs`, {layout:'dashboard',id:req.params.postId});
});


module.exports = router;