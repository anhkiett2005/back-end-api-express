const mongoose = require('mongoose');

const {Schema} = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true,'Hãy nhập tên danh mục'],
            unique: true,
            enum: [
                'Tour nhiều ngày',
                'Tour trong ngày',
                'Tour ẩm thực',
                'Tour gia đình',
                'Tour trong nước',
                'Tour ngoài nước',
                'Tour phiêu lưu và trải nghiệm',
            ]
        }
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;