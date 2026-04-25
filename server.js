const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e8 // Allows larger audio files to be sent
});

// Serve the HTML file
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // When audio is received from one user, broadcast it to everyone else
    socket.on('audioMessage', (audioData) => {
        socket.broadcast.emit('audioMessage', audioData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Listen on all network interfaces (0.0.0.0) so phones on the same Wi-Fi can connect
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Walkie Talkie server running! Connect your phone to: http://<YOUR_LOCAL_IP_ADDRESS>:${PORT}`);
});