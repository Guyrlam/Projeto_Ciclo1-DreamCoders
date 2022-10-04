const { addCategory } = require('../services/category-services');

async function insertCategory(req, res) {
    try {
        const response = await addCategory(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { insertCategory };
