import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom";
import authenticate from "../../auth/Authenticate";




const Matches = props => {

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("")
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([])
  useEffect(authenticate(setIsLoggedIn,setAccountInfo,jwtToken), [])


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

  //const {user} = useContext(authenticate);
  //console.log(user);

  /*
  const matches = [
    {       // name of the match individual
    name: "Name of Person",
    lastMessagePrev: "It's good to meet you",
    // profile picture of the match individual
    profilePicture:`${process.env.PUBLIC_URL}/logo192.png`,
    // unique ID of the match individual
    id:1,
    }
  ]
  */
 const matches = [{}]
    return (
      <>
      {isLoggedIn ? 
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
       : ""}
      </>
    )
  }
  
  export default Matches