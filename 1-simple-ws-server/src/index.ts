import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws, req) => {
    ws.on("message", (message) => {
        console.log("received: %s", message);
        ws.send(`Hello, you sent -> ${message}`);
    });
});

app.get("/health", (req, res) => {
    res.json({msg: "I am healthy"})
})

server.listen(port, () => {
    console.log(`Server started successfully on port ${port}`);
}).on('error', (error) => {
    console.error('Server failed to start:', error);
});

// WebSocket error handling
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

// Add connection success log
wss.on("connection", async (ws, req) => {
    console.log('New WebSocket client connected');
    ws.on("message", (message) => {
        console.log("received: %s", message);
        ws.send(`Hello, you sent -> ${message}`);
    });
});