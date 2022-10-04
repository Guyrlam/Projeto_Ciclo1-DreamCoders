const { addImage } = require('../services/images-services');

async function insertImage(req, res) {
    try {
        const verification = await addImage(req.file);
        res.status(200).json(verification);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { insertImage };
