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
            required: false
        },
        location: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['Tour', 'Sự kiện & Show diễn']
        },
        category: {
            type: String,
            required: function () {
                return this.type === 'Tour' || this.type === 'Sự kiện & Show diễn';
            },
            enum:['Hot','Tour gia đình','Tour trong nước','Tour ngoài nước','Tour phiêu lưu và khám phá thiên nhiên'],
            validate: {
                validator: function(value) {
                    if(this.type === 'Tour') {
                        return ['Hot','Tour gia đình','Tour trong nước','Tour ngoài nước','Tour phiêu lưu và khám phá thiên nhiên'].includes(value)
                    }else if(this.type === 'Sự kiện & Show diễn') {
                        return ['Sự kiện âm nhạc','Triển Lãm','Kịch'].includes(value)
                    }
                    return true;
                },
                message: props => `Giá trị ${props.value} không hợp lệ cho category khi type là ${props.instance.type}!`
            },
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
        },
        duration: {
            type: String,
            required: function() {
                return this.type === 'Tour';
            },
            validate: {
                validator: function(value) {
                    if (this.type === 'Tour') {
                        return /^(\d+ ngày \d+ đêm)$/.test(value);
                    } else if (this.type === 'Sự kiện & Show diễn') {
                        return /^(\d+ giờ|\d+ ngày)$/.test(value);
                    }
                    return true;
                },
                message: props => `Giá trị ${props.value} không hợp lệ cho duration!`
            }
        }
    },
    {
        timestamps: true
        
    }
);


const Products = mongoose.model('tours',productSchema);

module.exports = Products;