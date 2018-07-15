const express = require('express');
const router = express.Router();
const categoriesModel = require('../../../../models/core/categories')

router.get('/', (req, res) => {
    res.render(`core/dashboard/posts/categories.hbs`, {layout: 'dashboard'});
});

router.post('/', (req, res) => {
    categoriesModel.save({name: req.body.name, description: req.body.description}, res)
})

module.exports = router;