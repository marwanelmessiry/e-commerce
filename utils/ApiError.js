// @desc this clas is responsible for errors that can be predicted
class ApiError extends Error {
    constructor(message, StatusCode) {
        super(message)
        this.StatusCode = StatusCode
        this.status = `${StatusCode}`.startsWith(4) ? 'error' : 'fail'
        this.isOperational = true
    }
}
module.exports = ApiError