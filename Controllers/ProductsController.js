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
            let query = utils.convertString(req.query.t);
            const tour = await Tours.findOne({name:query});
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
            const tour = await Tours.findOneAndUpdate({slug:slug},req.body);
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
            const tour = await Tours.findOneAndDelete({slug:slug});
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour deleted failed'
                })
            }
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
