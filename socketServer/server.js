import { Server } from 'socket.io';
const io = new Server(3002, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('attend_shift', (data) => {
    console.log(`User ${data.userActive} is attending shifts of type ${data.typeShift} at box ${data.place}`);
    io.emit('attend_shift', data);
  });

  socket.on('create_shift', (data) => {
    console.log(`New shift created: ${JSON.stringify(data)}`);
    io.emit('new_shift', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
