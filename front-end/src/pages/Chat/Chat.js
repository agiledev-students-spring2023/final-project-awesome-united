import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";




const Matches = props => {

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("")



  //for spring01 set to take user to static page
  //take user to chat session with match
  const handleClick = e => {
    console.log("going to chat!")
    let path = `/chat`; 
    navigate(path);    
  }
  //for spring01 set to take user to static page
  //take user to matches' profile
  const handleImageClick = e => {
    console.log("going to profile!")
    let path = `/profile`; 
    navigate(path);   
  }

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
      message: "Also, are utilities and furniture included?",
      date:"2012-04-23T18:27:02.511Z",
      id:0,
    },
    {
      name: "me",
      message: "your post didnt say mention anything",
      date:"2012-04-23T18:27:15.511Z",
      id:0,
    },
  ]

    return (
      <main>
        <header>
            <h1>Michael Angelo</h1>
        </header>
        <article className="chatlog">
        {/*
          * loop through the array of chatlog  data, and display its messages
          */}
        {chatlog.map((comp, i, matchesArray) => (
          if {comp.id = 0}
          <div className="">
            {comp.message}
          </div>
        ))}
        </article>
        <footer>

        </footer>

      </main>
    )
  }
  
  export default Matches