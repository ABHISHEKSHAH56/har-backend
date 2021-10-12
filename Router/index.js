
const createHttpError = require('http-errors')
const express = require("express");
const { AllProduct, addproduct, deleteProduct, updateproduct } = require('./Productroute');
const router = express.Router();


router.get("/all", AllProduct);
router.post("/add", addproduct);
router.delete("/delete/:id", deleteProduct);
router.patch("/update",  updateproduct);



module.exports = router;

