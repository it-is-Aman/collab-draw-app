import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {

    const url = request.url

    // access query params
    const queryUrl = new URLSearchParams(url?.split("?")[1])

    const token = queryUrl.get("token")

    if (!token) {
        ws.send("no token found")
        ws.close()
    }

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
});