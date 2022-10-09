const check = {
    text: `SELECT
    email,
    telephone,
    password
    FROM user_profile
    WHERE deleted_at isnull`,
};

const newUser = {
    text: 'INSERT INTO user_profile(name, image_id, class_id, email, telephone, password) VALUES($1, $2, $3, $4, $5, $6)',
    values: [],
};

const token = {
    text: `select 
    user_profile.id user_id,
    user_profile.name user_name,
    user_profile.description,
    user_profile.email,
    user_profile.telephone,
    user_classes.class,
    images.file_name
    from user_profile
    inner join user_classes
    on user_profile.class_id = user_classes.id
    inner join images
    on user_profile.image_id =  images.id
    where user_profile.email = $1`,
    values: [],
};

const users = {
    text: `SELECT
    user_profile.id,
    user_profile.name,
    user_profile.description,
    images.file_name image,
    user_classes.class,
    user_profile.email,
    user_profile.telephone
    FROM user_profile
    INNER JOIN images
    ON images.id = user_profile.image_id
    INNER JOIN user_classes
    ON user_classes.id = user_profile.class_id
    WHERE user_profile.deleted_at isnull`,
};

const newPwd = {
    text: 'UPDATE user_profile SET password = $1, updated_at = now() WHERE id = $2',
    values: [],
};

const update = {
    text: 'UPDATE user_profile SET name = $1, description = $6, class_id = $2, email = $3, telephone = $4, updated_at = now() WHERE id = $5',
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

async function tokenInfo(email, client) {
    token.values = [email];
    const response = await client.query(token);
    return response.rows[0];
}

async function userList(client) {
    const response = await client.query(users);
    return response.rows;
}

async function changePassword(userID, password, client) {
    newPwd.values = [password, userID];
    await client.query(newPwd);
}

async function updateUser(array, client) {
    update.values = array;
    await client.query(update);
}

module.exports = {
    checkUser,
    insertUser,
    tokenInfo,
    userList,
    changePassword,
    updateUser,
};
