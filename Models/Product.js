const mongoose = require('mongoose');


const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        departureDate: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum:['Hot','Tour gia đình','Tour trong nước','Tour ngoài nước','Tour phiêu lưu và khám phá thiên nhiên']
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        ratings: {
            type: Number,
            min: 1,
            max: 5,
            default: 3
        }
    },
    {
        timestamps: true
        
    }
);


const Products = mongoose.model('tours',productSchema);

module.exports = Products;