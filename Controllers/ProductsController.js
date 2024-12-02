const Tours = require('../Models/Product');
const Category = require('../Models/Category');
const utils = require('../utils/utils');

class TourController {
    async getAllProducts(req,res) {
        try {
            const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page,10) : 1; // nếu không truyền vào mặc định là trang 1
            const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit,10) : 3; // nếu không truyền vào mặc định là 6 tour
            const skip = (page - 1) * limit; // Tính skip dựa trên page và limit
            const tour = await Tours.find()
            .skip(skip)
            .limit(limit);

            if(!tour) return res.status(404).json({success: false, message: 'Tour not found'});

            // tổng số tài liệu 
            const totalTours = await Tours.countDocuments();


            res.status(200).json({
                success: true,
                message: 'Get all tours successfully',
                data: tour,
                pagination : {
                    currentPage: page,
                    totalPages: Math.ceil(totalTours / limit),
                    totalTours: totalTours,
                    limit: limit
                },
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

    async getOneProductById(req, res) {
        try {
            const { id } = req.params; // Lấy id từ params
    
            // Tìm tour theo _id, dùng phương thức findById để tối ưu tìm theo ObjectId
            const tour = await Tours.findById(id);
    
            if (!tour) {
                // Nếu không tìm thấy tour, trả về lỗi 404
                return res.status(404).json({
                    success: false,
                    message: 'Tour not found'
                });
            }
    
            // Nếu tìm thấy tour, trả về dữ liệu tour
            res.status(200).json({
                success: true,
                message: 'Get tour successfully',
                data: tour,
                statusCode: 200
            });
        } catch (error) {
            // Nếu có lỗi, trả về lỗi 500 với thông báo lỗi
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    

    async getOneProductNameQuery(req,res) {
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

            if(!tours) return res.status(404).json({success: false, message: 'Tour not found'});
            
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

    async getProductByCate(req,res) {
        try {
            const {category} = req.query;
            const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page,10) : 1; // nếu không truyền vào mặc định là trang 1
            const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit,10) : 6; // nếu không truyền vào mặc định là 6 tour
            const skip = (page - 1) * limit; // Tính skip dựa trên page và limit
            
            if(!category) res.status(404).json({message: 'Category is required'})
            
            const tours = await Tours.find({category: category})
            .skip(skip)
            .limit(limit);

            if(!tours) {
                res.status(404).json({
                    success: false,
                    message: 'Tours not found'
                });
            }

            // tổng số tài liệu 
            const totalTours = await Tours.countDocuments();

            res.status(200).json({
                success: true,
                message: 'Get tours by category successfully',
                data: tours,
                pagination : {
                    currentPage: page,
                    totalPages: Math.ceil(totalTours / limit),
                    totalTours: totalTours,
                    limit: limit
                },
                statusCode: 200
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async createProduct(req,res) {
        try {
            const {category, ...tourData} = req.body;

            // Check danh mục có tồn trong collection Category
            const categoryExist = await Category.findOne({name: category});
            if(!categoryExist) {
                return res.status(404).json({
                    message: 'Category not found'
                })
            }

            const slugExist = await Tours.findOne({slug: tourData.slug});
            if(slugExist) {
                return res.status(409).json({
                    message: 'Tour already exists'
                })
            }

            // Gán ObjectId của danh mục
            tourData.category = categoryExist._id;

            await Tours.create(tourData);
            res.status(201).json({
                success: true,
                message: 'Created tour successfully',
                // data: newTour,
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
            const tour = await Tours.findOne({slug: normalizedSlug});
            if(!tour) {
                return res.status(404).json({
                    message: 'Tour not found',
                    statusCode: 404
                })
            }

             // Nếu có thay đổi category, kiểm tra danh mục có tồn tại không
            if(req.body.category) {
                const categoryExist = await Category.findOne({name: req.body.category});
                if(!categoryExist) {
                    return res.status(404).json({
                        message: 'Category not found'
                    })
                }
                 // Cập nhật category bằng ObjectId
                req.body.category = categoryExist._id;
            }

            // Nếu slug được thay đổi, kiểm tra xem slug mới đã tồn tại hay chưa
            if(req.body.slug && req.body.slug !== normalizedSlug) {
                const slugExist = await Tours.findOne({ slug: req.body.slug });
                if(slugExist) {
                    return res.status(409).json({
                        message: 'Tour already exists'
                    });
                }
            }

            // Cập nhật tour
            const updatedTour = await Tours.findOneAndUpdate({slug: normalizedSlug},req.body,{new: true});

            if (!updatedTour) {
                return res.status(400).json({
                    message: 'Tour update failed'
                });
            }


            res.status(200).json({
                success: true,
                message: 'Updated tour successfully',
                data: updatedTour,
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
