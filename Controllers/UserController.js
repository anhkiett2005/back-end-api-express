const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');

class UserController {
    async registerUser(req,res) {
        try {
            const {username,email,password,phone} = req.body;

            // Check nếu đã tồn tại user
            const userExist = await User.findOne({email: email});
            if(userExist) {
                return res.status(404).json({
                    success: false,
                    message: 'Tài khoản đã tồn tại!'
                })
            }

            // Hash password trước khi lưu vào DB
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tiến hành lưu user
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                phone: phone
            });
            await newUser.save();

            res.status(201).json({
                success: true,
                message: 'Đăng ký thành công!',
                statusCode: 201
            })
        } catch (error) {
            res.status(500).json({
                message: 'Lỗi server',
                error: error.message
            })
        }
    }

    async loginUser(req,res) {
        try {
            const {email, password} = req.body;

            // Check coi có tài khoản trong db chưa
            const user = await User.findOne({email: email});
            if(!user) {
                return res.status(404).json({
                    message: 'Tài khoản không tồn tại!'
                })
            }

           

            // So sánh password đã nhập với password trong db
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({
                    message: 'Tài khoản hoặc mật khẩu không đúng'
                })
            }

             // Kiểm tra xem tài khoản có đang hoạt động không
             if (!user.isActive) {
                return res.status(400).json({
                    message: 'Tài khoản của bạn đã bị vô hiệu hóa!'
                });
            }


            // Lọc ra các trường cần trả về
            const userResponse = {
                username: user.username,
                email: user.email,
                role: user.role
            };

            res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                user: userResponse,
                isActive: user.isActive,
                statusCode: 200
            })
        } catch (error) {
            res.status(500).json({
                message: 'Lỗi server',
                error: error.message
            })
        }
    }
}

module.exports = new UserController();