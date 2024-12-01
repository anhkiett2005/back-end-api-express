const mongoose = require('mongoose');
const Cates = require('../Models/Category');

class CategoryController {
    async getAllCates(req,res) {
        try {
            const cates = await Cates.find();

            res.status(200).json({
                success: true,
                message: 'Get all categories successfully',
                data: cates,
                statusCode: 200

            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
                statusCode: 500
            });
        }
    }

    async getOneCate(req,res) {
        try {
            const cate = await Cates.findById(req.params.id);

            if(!cate) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                    statusCode: 404
                });
            }

            res.status(200).json({
                success: true,
                message: 'Get category successfully',
                data: cate,
                statusCode: 200
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
                statusCode: 500
            });
        }
    }

    

    async createCate(req,res) {
        try {
            await Cates.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Create category successfully',
                statusCode: 201
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
                statusCode: 500
            })
        }
    }

    async updateCate(req,res) {
        try {
            const cateId = req.params.id;
            const cate = await Cates.findByIdAndUpdate(cateId,req.body);
            
            if(!cate) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found',
                    statusCode: 404
                });
            }

            res.status(200).json({
                success: true,
                message: 'Updated category successfully',
                data: cate,
                statusCode: 200
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
                statusCode: 500
            });
        }
    }

    async deleteCate(req,res) {
        try {
            const cateId = req.params.id;
            const cate = await Cates.findById(cateId);

            // Kiểm tra xem ID có hợp lệ không
            if (!mongoose.Types.ObjectId.isValid(cateId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category ID',
                    statusCode: 400
                });
            }

            if(!cate) {
                return res.status(404).json({
                    message: 'Category not found or already deleted'
                });
            }

            // nếu tồn tại xóa danh mục
            await Cates.deleteOne({_id : cateId});

            res.status(200).json({
                success: true,
                message: 'Deleted category successfully',
                statusCode: 200
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
                statusCode: 500
            });
        }
    }
}

module.exports = new CategoryController();