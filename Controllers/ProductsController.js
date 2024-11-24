const Tours = require('../Models/Product');
const utils = require('../utils/utils');
const axios = require('axios');
const validator = require('validator');

class TourController {
    async getAllProducts(req,res) {
        try {
            const tour = await Tours.find();

            res.status(200).json({
                success: true,
                message: 'Get all tours successfully',
                data: tour,
                statusCode: 200
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async getOneProduct(req,res) {
        try {
            const {slug} = req.params;
            const normalizedSlug = utils.toSlug(slug);
            const tour = await Tours.findOne({slug:normalizedSlug});
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour not found'
                })
            }

            res.status(200).json({
                success: true,
                message: 'Get tour successfully',
                data: tour,
                statusCode: 200
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message
            })
        }
    }

    async getOneProductQuery(req,res) {
        try {
            let query = req.query.t
            const covertQuery = utils.convertString(query)
            const tour = await Tours.findOne({name:covertQuery});
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour not found'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Get tour successfully',
                data: tour,
                statusCode: 200
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async getAllProductsPaginationsQuery(req,res) {
        try {
            const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page,10) : 1; // nếu không truyền vào mặc định là trang 1
            const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit,10) : 6; // nếu không truyền vào mặc định là 6 tour
            const skip = (page - 1) * limit; // Tính skip dựa trên page và limit
            
            // Lấy danh sách tour
            const tours = await Tours.find()
            .skip(skip) // Bỏ qua số tài liệu theo phân trang
            .limit(limit); // Giới hạn số tài liệu trả về
            
            // tổng số tài liệu 
            const totalTours = await Tours.countDocuments();

            res.status(200).json({
                success: true,
                message: 'Get tours with pagination successfully',
                data: tours,
                pagination : {
                    currentPage: page,
                    totalPages: Math.ceil(totalTours / limit),
                    totalTours: totalTours,
                    limit: limit
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async createProduct(req,res) {
        try {
            await Tours.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Created tour successfully',
                statusCode: 201
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async putProduct(req,res) {
        try {
            const {slug} = req.params;
            const normalizedSlug = utils.toSlug(slug);
            const tour = await Tours.findOneAndUpdate({slug:normalizedSlug},req.body);
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour update failed'
                })
            }
            res.status(200).json({
                success: true,
                message: 'Updated tour successfully',
                statusCode: 200
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async deleteProduct(req,res) {
        try {
            const {slug} = req.params;
            const normalizedSlug = utils.toSlug(slug);
            const tour = await Tours.findOne({slug:normalizedSlug});
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour not found or already deleted'
                })
            }
            // Nếu tồn tại, xóa tour
            await Tours.deleteOne({slug:slug});
            res.status(200).json({
                message: 'Deleted tour successfully',
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

   


module.exports = new TourController();
