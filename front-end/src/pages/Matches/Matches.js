 
import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
import authenticate from "../../auth/Authenticate";
import axios from "axios"
import Chat from "../Chat/Chat"



const Matches = props => {

  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([])

  const [matches, setMatches] = useState([]);
  const [currentChat, setCurrentChat] = useState( null )
  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
  }, []);

  useEffect(() =>{
     const getMatches = async ()=>{
      let tmp = {userId: accountInfo.id}
      while( accountInfo == null );
       try{
         const res = await axios.post("http://localhost:3001/get-Matches/", tmp )
         console.log(res)
         setMatches(res.data)
       }catch(err){
         console.log(err) 
       }
     };
     getMatches()
     console.log(matches)
  },[accountInfo.id])

  const chatPage = (
    <>
    {currentChat != null ?
    <Chat
      match={currentChat}
      otherUserId = {currentChat.members.find(m => m !== accountInfo.id)}
      currentUser={accountInfo}
      messages={messages}
    />
    : ""}
    </>
  );

  // maybe move this to Chat.js ?
  useEffect( () => {
    const getChat = async () =>{
      // currentChat is really just the match that was clicked on
      let tmp = { matchId: currentChat?.id}
      try{
        const res = await axios.post("http://localhost:3001/get-Chat/", tmp)
        //const res = await axios.post("http://localhost:3001/Chat/" + currentChat?.id)
        setMessages(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getChat()
  },[currentChat])

  const matchesPage = (
    <>
    {isLoggedIn ? 
    <main className="Matches">
    {/*
      { accountInfo.accountType == "Seller" ?
      <header className="Filters">
        <button onClick={}>Yes</button>
        <button onClick={}>Maybe</button>
      </header>
      : "" }
    */}
      <article className="listMatches">
      {/*
        * loop through the array of match/chat list data, and return a component for each object therein
        */} 
      {matches.map((match, i, matchesArray) => (
      
        <div onClick={ () => setCurrentChat(match) }>
          <Match
            match = {match}
            currentUser = {accountInfo}
          />
        </div>
      ))}
      </article>
      </main>
      : <p className="noMatches">You have no matches</p> }
    </>   
  );

  // if currentChat == null , show matches page, else show chat
  return (
    <>
      { currentChat == null ? matchesPage : chatPage }
    </>
  )
}
  
export default Matches