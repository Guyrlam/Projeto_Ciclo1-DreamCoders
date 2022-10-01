const client = require('./repository')

async function insertBook(body){
    await client.connect()
    const req = 'INSERT INTO books (name, details, synopsis, sale, swao) VALUES($1,$2,$3,$4,$5) RETURNING *;' 
    const values = [body.name, body.details, body.synopsis, body.sale, body.swao]
    await client.query(req,values, (err, res) => {
        console.log(err, res.rows)
        client.end()
      })
}

