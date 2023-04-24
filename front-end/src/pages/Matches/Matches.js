 
import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
import SearchBar from "./SearchBar"
import { useNavigate } from "react-router-dom";
import authenticate from "../../auth/Authenticate";
import axios from "axios"





const Matches = props => {

  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([])
  
  

  const [matches, setMatches] = useState([]);
  useEffect(() =>{
     const getMatches = async ()=>{
      while(accountInfo == null ); // needed because info returned by authenticate is needed in this function
       try{
         const res = await axios.get("/matches/"+ accountInfo.id)
         console.log(res)
         setMatches(res.data)
       }catch(err){
         console.log("THIS IS ME: ")
         console.log("THIS IS ME22: " + accountInfo.firstName)
         //console.log(err)
 
         // DELETE THIS ONCE MONGO STUFF FOR SELLER AND DISCOVER PAGE IS DONE 
         // AND MONGO STUFF WORKS WORKS
         const backupData = [
           {
             id:999999999998,
             firstName:"Jane",
             lastName:"Smith",
             profilePhoto: `${process.env.PUBLIC_URL}/nno-profile-pic.webp`,
             createdAt: "2023-04-18T18:25:43.511Z",
             members:["4e8df0eb-6b1d-45a2-8272-0993de89334e",""],
             updatedAt: "2023-04-18T18:25:43.511Z",
             id:"9999998",
             __v: 0
           },
           {
             id: 999999999999,
             firstName: "John",
             lastName: "Doe",
             profilePhoto: `${process.env.PUBLIC_URL}/nno-profile-pic.webp`,
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
     getMatches()
  },[accountInfo.id])
  
  
  
  
  
  
  
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
    return (
      <>
      {isLoggedIn ? 
      <main className="Matches">
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
            currentUser = {accountInfo}
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