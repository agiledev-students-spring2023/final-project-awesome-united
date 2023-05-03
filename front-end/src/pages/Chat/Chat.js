import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./Chat.css"
import { TrySharp } from "@mui/icons-material";
import  { format }  from  "timeago.js";
import io from "socket.io-client"



const Chat = props => {

  const [newMessage, setNewMessage] = useState("") // buffer for user's typed in message
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [otherUser, setOtherUser] = useState("")
  const [messages, setMessages] = useState([])
  const socket = useRef()
  const scroll = useRef()

  useEffect(()=>{
    socket.current = io("ws://localhost:5000") 
    socket.current.on("getMessage",data =>{
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  },[])


  useEffect(()=>{
    // if arrivalMessage is not null
    arrivalMessage && props.match?.members.includes(arrivalMessage.sender) &&
    setMessages( (prev) => [...prev,arrivalMessage])
  },[arrivalMessage, props.match])

  useEffect(()=>{
    socket.current.emit("addUser", props.currentUser.id)
  },[ props.currentUser ])

  useEffect( ()=> {
    // UNCOMMENT the following:
    //setMessages(props.messages)
    const dummydata = [
      {
        matchId: props.match.id,
        sender: props.otherUserId,
        text: "Hey mikey",
      },
      {
        matchId: props.match.id,
        sender: props.otherUserId,
        text: "a que hora es el bbq",
      },
    ]
    setMessages(dummydata)
  },[])


  useEffect(()=>{
    const otherId = props.otherUserId
    // actually get the data associated with that userId
    const getUser = async ()=>{
      let tmp = {userId: otherId}
      try{
        const res = await axios.post("http://localhost:3001/get-User/", tmp)
        setOtherUser(res.data)
        console.log(res)
      }catch(err){
        console.log(err)
      }
    };
    getUser()
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault() // prevent the default browser form submission stuff

    const message = {
      matchId: props.match.id,
      sender: props.currentUser.id,
      text: newMessage,
    }

    socket.current.emit("sendMessage", {
      senderId: props.currentUser.id,
      receiverId: props.otherUserId,
      text: newMessage,
    })

    try{
      const res = await axios.post("http://localhost:3001/post-Chat", message)
      setMessages([...messages, res.data])
      setNewMessage("")
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  function whoSent(sender){
    if (sender == props.currentUser.id) return "self"
    return "other"
  }

  return (
    <>
    <main>
      <header>
          {/*}
          <h2>1653 E 8th St, Brooklyn, NY</h2>
          */}
          <h3>{otherUser.firstName + " " + otherUser.lastName}</h3>
      </header>

      <section className="messageBox">
      {/*
        * loop through the array of messages, and display it
        */} 
      {messages.map((message, i, matchesArray) => (
          <p ref={scroll} className={whoSent(message.sender)}>{message.text}</p>
      ))}
      </section>
      
      {/* input box */}
      <form className="messageForm" onSubmit={handleSubmit}>
        <textarea 
        type="text"
        placeholder="Message..."
        onChange={e => setNewMessage(e.target.value)}
        value={newMessage}
        />
        <input type="submit" id="send-button" value="Send"/>
      </form>
      </main>
      </>
  )
}
  
export default Chat