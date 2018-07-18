const express = require('express');
const router = express.Router();
const categoriesModel = require('../../../../models/core/categories')

router.get('/', (req, res) => {
    categoriesModel.getFullCategories(data=>{
        res.render(`core/dashboard/categories/categories.hbs`, {
            layout: 'dashboard',
            categories: data
        });
    })
});

router.post('/', (req, res) => {
    categoriesModel.save({
        name: req.body.name,
        description: req.body.description
    }, res)
})

module.exports = router;