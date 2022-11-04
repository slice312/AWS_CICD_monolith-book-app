const error = (res, status, text) => 
    res.status(status)
        .json({message: text})
        .end();

module.exports = {
    error
};