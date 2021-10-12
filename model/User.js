const mongoose = require("mongoose");




const productSchema = new mongoose.Schema({
        categorey: String,
        description: String,
        name: String,
        englishName: String,
        image: String,
        tag: String,
        basePrice: Number,
        baseQty: String,
        isStock: {
                type: Boolean,
                default: true
        },


}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;