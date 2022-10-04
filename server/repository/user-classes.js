const select = {
    text: `SELECT 
    id 
    FROM user_classes
    WHERE class = $1`,
    values: [],
};

async function selectClassID(userType, client) {
    select.values = [userType];
    const response = await client.query(select);
    return response.rows[0].id;
}

module.exports = { selectClassID };
