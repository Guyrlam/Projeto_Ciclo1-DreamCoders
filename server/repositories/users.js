const client = require('./repository')

async function insertUser(body){
    await client.connect()
    const req = 'INSERT INTO users (name,email,phone,password) VALUES($1,$2,$3,$4) RETURNING *;' 
    const values = [body.name, body.email, body.phone, body.password]
    await client.query(req,values, (err, res) => {
        console.log(err, res.rows)
        client.end()
      })
}

async function deleteUser(id){
    await client.connect()
    const req = 'DELETE FROM users WHERE id = $1 RETURNING *;' 
    const values = [id]
    await client.query(req,values, (err, res) => {
        console.log(err, res.rows)
        client.end()
      })
}

async function updateUser(body){
    await client.connect()
    const req = `UPDATE users
    SET nome = $2,
        email = $3,
        phone = $4,
        password = $5
    WHERE id = $1 
    RETURNING *;` 
    const values = [body.id, body.nome, body.email, body.phone, body.password]
    await client.query(req,values, (err, res) => {
        console.log(err, res.rows)
        client.end()
      })
}