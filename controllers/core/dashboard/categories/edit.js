const express = require('express');
const router = express.Router();
const categoriesModel = require('../../../../models/core/categories')

router.get('/:categoryId', (req, res) => {
    categoriesModel.getCategoryById(req.params.categoryId, (category) => {
        categoriesModel.getFullCategories(categories => {
            res.render(`core/dashboard/categories/edit.hbs`, {
                layout: 'dashboard',
                category: category,
                categories: categories
            });
        })
    });
});
// router.post('/', (req, res) => {
//     categoriesModel.save({name: req.body.name, description: req.body.description}, res)
// })

module.exports = router;