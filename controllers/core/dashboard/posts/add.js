const express = require('express');
const router = express.Router();
const categoriesModel = require('../../../../models/core/categories')

router.get('/', (req, res) => {
    categoriesModel.getCategories(data => {
        res.render(`core/dashboard/posts/add.hbs`, {layout: 'dashboard', categories: data});
    })

});

router.post('/', (req, res) => {
    categoriesModel.save({name:req.body.title,description:req.body.description},res)
})

module.exports = router;