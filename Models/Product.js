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
        description: {
            type: String,
            required: true
        },
        departureDate: {
            type: Date,
            required: [true,'Trường này là bắt buộc']
        },
        endDate: {
            type: Date,
            required: [true,'Trường này là bắt buộc'],
            validate: {
                validator: function(value) {
                    if (this.departureDate && value) {
                        const startDate = new Date(this.departureDate);
                        const endDate = new Date(value);
                        return endDate > startDate;
                    }
                    return true;
                },
                message: props => `Ngày kết thúc (${props.value}) phải lớn hơn ngày khởi hành!`
            }
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true
            
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
        departureLocation: {  // Nơi khởi hành
            type: String,
            required: [true,'Trường này là bắt buộc']
        },
        arrivalLocation: {  // Nơi đến
            type: String,
            required: [true,'Trường này là bắt buộc']
        },
        services: {  // Dịch vụ
            type: [String],
            required: true,
        },
        notes: {  // Lưu ý
            type: [String],
            required: true,
        },
        tourImages: {  // Nhiều ảnh của tour
            type: [String],  // Mảng các URL của ảnh
            required: false
        },
        tourType: {  // Loại tour (cao cấp, tiêu chuẩn, giá tốt)
            type: String,
            enum: ['cao cấp', 'tiêu chuẩn', 'giá tốt'],
            required: true
        }
    },
    {
        timestamps: true
        
    }
);


const Products = mongoose.model('tours',productSchema);

module.exports = Products;