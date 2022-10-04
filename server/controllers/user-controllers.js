const { addUser } = require('../services/user-services');

async function insertImage(req, res) {
    const response = await addUser(req.file);

    if(response.Error ==)
    res.status(200).json(verification);
}

module.exports = { insertImage };