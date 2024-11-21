function validateSlug(req, res, next) {
    const { slug } = req.params;
    if (!slug || slug.trim() === '') {
      return res.status(400).json({
        message: 'Slug is required and cannot be empty or just whitespace',
      });
    }
  
    next();
  }
  
module.exports = validateSlug;