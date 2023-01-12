MONGO_URI='mongo+srv://<user>:<pass>@<host>:<port>/<database>?<connection options>'

require('dotenv').config()

const client = new MongoClient(uri, {
    tls: true,
})

