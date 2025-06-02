const MENSAGE = require("../modulo/config")


async function getTeste(request, response) {
    let result = MENSAGE.active_server

    response.status(result.status_code)
    response.json(result)
}

module.exports = {
    getTeste
}