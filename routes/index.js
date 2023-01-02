const routes = require('express'.Router());

routes.get('/', (req, res) => {
    res.send("Emma Peach");
})

module.exports = routes;