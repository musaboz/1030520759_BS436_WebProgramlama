const express_ws = require("express-ws");

let ews;

const init = (app) => {
    ews = express_ws(app);

    app.ws("/", (socket, req) => {
        console.log("Yeni ws bağlantısı oluşturuldu");

        broadCastCount();

        socket.on("close", () => {
            broadCastCount();
        });
    });
}

const broadCastCount = () => {
    const n = ews.getWss().clients.size;

    ews.getWss().clients.forEach((client) =>{
        const data = JSON.stringify({userCount: n});
        client.send(data);
    });
}

module.exports = {init};