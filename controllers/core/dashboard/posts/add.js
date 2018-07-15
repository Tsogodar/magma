const express = require('express');
const router = express.Router();
const categoriesModel=require('../../../../models/core/categories')

router.get('/', (req, res) => {
    res.render(`core/dashboard/posts/add.hbs`, {layout: 'dashboard',categories:categoriesModel.getAll()});
});

router.post('/',(req,res)=>{
    console.log(req.body)
    // categoriesModel.save({name:req.body.title,description:req.body.title},res)
})

module.exports = router;