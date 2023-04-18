import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
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

  const {user} = useContext
  
  const matches = [ {} ]
    return (
      <main className="Matches">

      {/*
      <SearchBar /> 
    
      {feedback && (
        <div>
          <p class="Home-feedback">{feedback}</p>
        </div>
      )}
      */}
      {/*
        <header>
          <button onClick={}>Yes</button>
          <button onClick={}>Maybe</button>
        </header>
      */}
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