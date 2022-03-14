const responseData = require('../response/response');
async function getProtected(req, res) {
    return res.json(responseData("Success", { secret: 'CS572 is the best course ever!' }));
}

module.exports = { getProtected }