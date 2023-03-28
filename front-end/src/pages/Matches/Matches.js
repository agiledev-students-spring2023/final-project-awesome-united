import "./Matches.Modules.css"
import Match from "./Match"
import { useState, useEffect } from "react"
import SearchBar from "./SearchBar"
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

  //an array of chats... imagine this is fetched from a back-end server API
  // we hard-code it here so we can focus on React.js, not back-end code
  const matches = [
    {
      // name of the match individual
      name: "Name of Person",
      lastMessagePrev: "It's good to meet you",
      // profile picture of the match individual
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
      // unique ID of the match individual
      id:1,
    },
    {
      name: "Name2",
      lastMessagePrev: "It's good to meet you",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
      id:2,
    },
    {
      name: "Name3",
      lastMessagePrev: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
      id:3,
    },
    {
      name: "Name4",
      lastMessagePrev: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
      id:4,
    },
  ]

    return (
      <main className="Matches">

      <SearchBar /> {/* show the searchbar*/}
      {feedback && (
        <div>
          <p class="Home-feedback">{feedback}</p>
        </div>
      )}


        <article className="listMatches">
        {/*
          * loop through the array of match/chat list data, and return a component for each object therein
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