const { addWriter } = require('../services/writer-services');

async function insertWriter(req, res) {
    try {
        const response = await addWriter(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { insertWriter };