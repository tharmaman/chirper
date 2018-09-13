/**
 * Middleware to be used after 404 handler
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function errorHandler(err, req, res, next){
    return res.status(err.status || 500).json({
        error: {
            message: err.message || "Oops! Something went wrong."
        }
    });
}

module.exports = errorHandler;