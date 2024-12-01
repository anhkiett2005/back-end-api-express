const mongoose = require('mongoose');
const {Schema} = mongoose;


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true,'Trường này là bắt buộc'],
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: [true,'Trường này là bắt buộc'],
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: [true,'Trường này là bắt buộc'],
        },
        phone: {
            type: String,
            required: [true,'Trường này là bắt buộc'],
            maxlength: 10,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);
const User = mongoose.model('User',userSchema);

module.exports = User;