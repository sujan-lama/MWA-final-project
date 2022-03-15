module.exports = (message, data) => {
    return {
        success: (!data) ? false : true,
        message: message,
        data: data
    }
}

