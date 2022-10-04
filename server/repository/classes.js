const select = {
    text: `SELECT 
    id 
    FROM Classes
    WHERE class = $1`,
    values: [],
};

async function selectClassID(userType, client) {
    select.values = [userType];
    const response = await client.query(select);
    return response;
}

module.exports = { selectClassID };
