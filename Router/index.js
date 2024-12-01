const express = require('express'); 
const router = express.Router();
const {getAllProducts,getOneProduct,getOneProductQuery,createProduct,putProduct,deleteProduct, getAllProductsPaginationsQuery, getAllProductsByCate} = require('../Controllers/ProductsController');

const {getAllCates, getOneCate, createCate, updateCate, deleteCate} = require('../Controllers/CategoryController');
router.get("/tours",(req,res) => {
    if(req.query.category) {
        return getAllProductsByCate(req, res);
    }
    return getAllProducts(req, res);
});
router.get("/tour/:slug",getOneProduct);
router.get("/tour",getOneProductQuery);
router.get("/tours/list",getAllProductsPaginationsQuery);
router.post("/create",createProduct);
router.put("/update/:slug",putProduct);
router.delete("/delete/:slug",deleteProduct);

// Route category
router.get("/categories",getAllCates);
router.get("/category/:id",getOneCate);
router.post("/category/create",createCate);
router.put("/category/update/:id",updateCate);
router.delete("/category/delete/:id",deleteCate);
module.exports = router;