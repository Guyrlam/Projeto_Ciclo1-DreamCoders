const { addPublisher } = require('../services/publisher-services');

async function insertPublisher(req, res) {
    try {
        const response = await addPublisher(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { insertPublisher };
