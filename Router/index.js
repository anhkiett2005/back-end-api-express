const express = require('express'); 
const router = express.Router();
const {getAllProducts,getOneProduct,getOneProductQuery,createProduct,putProduct,deleteProduct, getAllProductsPaginationsQuery} = require('../Controllers/ProductsController');


router.get("/tours",getAllProducts);
router.get("/tour/:slug",getOneProduct);
router.get("/tour",getOneProductQuery);
router.get("/tours/list",getAllProductsPaginationsQuery);
router.post("/create",createProduct);
router.put("/update/:slug",putProduct);
router.delete("/delete/:slug",deleteProduct);




module.exports = router;