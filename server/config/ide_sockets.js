module.exports.chatSockets = function(socketServer){
    var roomID = 1234;
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',(socket)=>{
        console.log("New connection recied",socket.id);
        socket.on('disconnect',()=>{
            console.log('Socket disconnected');
        });
        socket.on('joinRoom', (room) => {
            console.log("New user joined")
            socket.join(room);
            roomID = room;

            
        });
        socket.on('ide',(data)=>{
            
            socket.to(roomID).emit('ide',data);
        })
        socket.on('language',(data)=>{
           
            socket.to(roomID).emit('language',data);
        })
        socket.on('reset',(data)=>{
            console.log("Here");
            socket.to(roomID).emit('reset',data);
        })
        
    });

}