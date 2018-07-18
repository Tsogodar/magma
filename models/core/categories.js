const mongoose = require('mongoose');

const Categories = mongoose.model('Categories_C', {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = {
    getCategories: (callback) => {
        Categories.find({}, {name: 1}).then(callback)
    },

    getFullCategories: (callback) => {
        Categories.find({}).then(callback)
    },

    getCategoryById: (categoryId,callback) => {
        Categories.findOne({_id: categoryId}).then(callback)
    },

    save: (object, res) => {
        const newCategory = new Categories(object);
        newCategory.save().then(() => {
            res.render(`core/dashboard/categories/categories.hbs`, {layout: 'dashboard', toast: true})
        });
    }
};