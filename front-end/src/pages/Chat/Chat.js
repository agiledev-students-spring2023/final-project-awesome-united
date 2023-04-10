import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "./Chat.css"




const Chat = props => {

  // create state variables and their setters so everytime thier value changes, the component updates them in the browser
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // this function runs once when the component first loads and again whenever the value of the breed variable changes
    // check your browser's Developer Tools -> Javascript Console to see this printed when the component first loads and anytime the breed value changes
    console.log(message)
  }, [message]) // the variable name in the array here is what causes this function to re-run any time the value of breed changes

  // info on the match ie other person's account
  const matchInfo = {
    id: 2,
    match: "maybe",
    profileImg: "someicon.png",

  }
  //an array of chats... imagine this is fetched from a back-end server API
  // we hard-code it here so we can focus on React.js, not back-end code
  const chatlog = [
    {
      // name of the match individual
      name: "me",
      message: "Hi Michael, is this listing still available?",
      date:"2012-04-23T18:25:43.511Z",
      // unique ID of the match individual
      id:0,
    },
    {
      name: "other",
      message: "Hey, yes it is!",
      date:"2012-04-23T18:25:59.511Z",
      id:2,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },
    {
      name: "me",
      message: "great! can we negotiate?",
      date:"2012-04-23T18:26:15.511Z",
      id:0,
    },


  ]

  function whoSent(id){
    if (id == 0) return "self"
    else return "other"
  }

  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    // send the data of the new puppy to a server
    // this server doesn't exist, so we will see an error in the console
    // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
    axios
      .post("https://someserversomehwere.com/puppy/save", {
        message: message,
      })
      .then(response => {
        // success
        console.log(`Received server response: ${response.data}`)
      })
      .catch(err => {
        // failure
        console.log(`Received server error: ${err}`)
        setError(
          "This form doesn't actually work, sorry.  There is no back-end for this example app in which to save the data. Pop open your web browser's Javascript Console to see the error trying to connect to a non-existent back-end."
        )
      })
      // clear form
      setMessage('')
  }


    return (
      <main>
        <header>
            <h2>1653 E 8th St, Brooklyn, NY</h2>
            <h3>Michael Angelo</h3>
        </header>
        <section className="messageBox">
        {/*
          * loop through the array of chatlog  data, and display its messages
          */}
        {chatlog.map((mes, i, matchesArray) => (
          <p className={whoSent(mes.id)}>{mes.message}</p>
        ))}
        </section>

        {/* input box */}
        <form id="messageForm" onSubmit={handleSubmit}>
          <textarea 
          type="text"
          placeholder="Message..."
          onChange={e => setMessage(e.target.value)}
          value={message}
          />
          <input type="submit" id="send-button" value="Send"/>
        </form>
      </main>
    )
  }
  
  export default Chat