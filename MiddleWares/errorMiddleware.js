// Global error handler

const globalError = (err, req, res, next) => {
    err.StatusCode = err.StatusCode || 500
    err.status = err.status || 'error'
    res.status(err.StatusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}
module.exports = globalError