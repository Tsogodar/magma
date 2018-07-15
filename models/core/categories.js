const mongoose = require('mongoose');

const Categories = mongoose.model('Categories_C', {
    name: String,
    description:String
});

module.exports={
    getAll:()=>{
        let categories=[];
        Categories.find({},{name:1}).then((data)=>{
            data.forEach((category)=>{
                categories.push(category.name)
            })
        })
        return categories;
    },
    save:(object,res)=>{
        const newCategory = new Categories(object);
        newCategory.save().then(() => {
            res.render(`core/dashboard/posts/categories.hbs`, {layout: 'dashboard',toast:true})
        });
    }
};