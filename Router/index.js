const express = require('express'); 
const router = express.Router();
const {getAllProducts,getOneProduct,getOneProductNameQuery,createProduct,putProduct,deleteProduct, getAllProductsPaginationsQuery, getProductByCate,getOneProductById} = require('../Controllers/ProductsController');

const {getAllCates, getOneCate, createCate, updateCate, deleteCate} = require('../Controllers/CategoryController');

const {registerUser, loginUser} = require('../Controllers/UserController');

router.get("/tours",(req,res) => {
    if(req.query.category) {
        return getProductByCate(req, res);
    }
    return getAllProducts(req, res);
});
router.get("/tour/:slug",getOneProduct);
// router.get("/tour/:id",getOneProductById);
router.get("/tour",getOneProductNameQuery);
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


// Route user
router.post("/user/register",registerUser);
router.post("/user/login",loginUser);
module.exports = router;