// Global error handler

const globalError = (err, req, res, next) => {
    err.StatusCode = err.StatusCode || 500
    err.status = err.status || 'error'
    if (process.env.NODE_ENV == 'development') {
        senErrorForDev(err, res)

    }
    else if (process.env.NODE_ENV == 'production') {
        senErrorForprod(err, res)

    }
}
const senErrorForDev = (err, res) => {
    res.status(err.StatusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}
const senErrorForprod = (err, res) => {
    res.status(err.StatusCode).json({
        status: err.status,
        error: err,

    })
}
module.exports = globalError