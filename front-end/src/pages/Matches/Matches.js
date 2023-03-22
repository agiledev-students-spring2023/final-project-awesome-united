import "./Matches.css"
import Match from "./Match"
import { useNavigate } from "react-router-dom";




const Matches = props => {

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

  //an array of chats... imagine this is fetched from a back-end server API
  // we hard-code it here so we can focus on React.js, not back-end code
  const matches = [
    {
      name: "Name of Person",
      lastMessagePrev: "It's good to meet you",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
    },
    {
      name: "Name2",
      lastMessagePrev: "It's good to meet you",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
    },
    {
      name: "Name2",
      lastMessagePrev: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
    },
    {
      name: "Name3",
      lastMessagePrev: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
    },
  ]

    return (
      <main className="matches">

        <article className="Home-puppies">
        {/*
          * loop through the array of chat list data, and return a component for each object therein
          * note how we pass arguments to the Puppy component, including a function definition.
          */}
        {matches.map((match, i, matchesArray) => (
          <Match
            profileImg={match.profilePicture}
            name={match.name}
            chatPreview={match.lastMessagePrev}
            handleClick={handleClick}
            handleImageClick={handleImageClick}
          />
        ))}
        </article>

      </main>
    )
  }
  
  export default Matches