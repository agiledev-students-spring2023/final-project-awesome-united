
import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom";
import authenticate from "../../auth/Authenticate";
import axios from "axios"





const Matches = props => {

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("")
  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([])
  useEffect(() => {
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
  }, []);

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

  /*
  console.log("BEFORE OBJECT")
  console.log(accountInfo);
  console.log("AFTER OBJECT")
 */
 const [matches, setMatches] = useState([]);
 useEffect(() =>{
    const getMatches = async ()=>{
      try{
        const res = await axios.get("/matches/"+ accountInfo.id)
        console.log(res)
        setMatches(res.data)
      }catch(err){
        console.log(err)

        // DELETE THIS ONCE MONGO STUFF FOR SELLER AND DISCOVER PAGE IS DONE 
        // AND MONGO STUFF WORKS WORKS
        const backupData = [
          {
            createdAt: "2023-04-18T18:25:43.511Z",
            members:["4e8df0eb-6b1d-45a2-8272-0993de89334e",""],
            updatedAt: "2023-04-18T18:25:43.511Z",
            id:"9999998",
            __v: 0
          },
          {
            createdAt: "2023-04-18T19:14:43.511Z",
            members:["4e8df0eb-6b1d-45a2-8272-0993de89334e",""],
            updatedAt: "2023-04-18T19:14:43.511Z",
            id:"9999999",
            __v: 0
          }
        ]
        setMatches(backupData)
      }
    };
    getMatches();
 },[accountInfo])
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
            match = {match}
            currentUserId = {accountInfo.id}
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