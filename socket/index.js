const io = require("socket.io")(5000,{
    cors:{
        origin:"http://localhost:3000"
    },
})

let users = []


const addUser = (userId,socketId) =>{
    //if userId already in 'users' dont add, else do add the user
    !users.some(user=>user.userId === userId ) &&
        users.push({userId,socketId})
}

const getUser = (userId) =>{
    return users.find(user=>user.userId === userId)
}

io.on("connection",(socket) =>{
    console.log("user connect")
    //get user id and socket id from user
    socket.on("addUser",userId=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    }) 

    // send, retrieve message
    socket.on("sendMessage",({senderId,receiverId,text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text,
        })
    })
})