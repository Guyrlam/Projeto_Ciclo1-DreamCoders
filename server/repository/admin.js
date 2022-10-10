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
    WHERE user_profile.deleted_at isnull
    AND approved isnull`,
};

async function usersAdminList(client) {
    const response = await client.query(users);
    return response.rows;
}

module.exports = { usersAdminList };
