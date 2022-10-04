const check = {
    text: `SELECT
    email,
    telephone
    FROM user_profile
    WHERE approved <> false`,
};

const newUser = {
    text: 'INSERT INTO user_profile(name, image_id, class_id, email, telephone, password) VALUES($1, $2, $3, $4, $5, $6)',
    values: [],
};

async function checkUser(client) {
    const response = await client.query(check);
    return response.rows;
}

async function insertUser(array, client) {
    newUser.values = array;
    await client.query(newUser);
}

module.exports = { checkUser, insertUser };
