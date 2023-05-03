 
import "./Matches.css"
import Match from "./Match"
import { useState, useEffect, useContext } from "react"
import SearchBar from "./SearchBar"
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
      while( accountInfo == null );
       try{
         const res = await axios.get("/Matches/"+ accountInfo.id)
         console.log(res)
         setMatches(res.data)
       }catch(err){
         //console.log(err)
 
         // DELETE THIS ONCE MONGO STUFF FOR SELLER AND DISCOVER PAGE IS DONE 
         // AND MONGO STUFF WORKS WORKS
         const backupMatches = [
           {
             id: 999999999998,
             createdAt: "2023-04-18T18:25:43.511Z",
             members:["4e8df0eb-6b1d-45a2-8272-0993de89334e","abcdefghijk1"],
             updatedAt: "2023-04-18T18:25:43.511Z",
             __v: 0
           },
           {
             id: 999999999999,
             createdAt: "2023-04-18T19:14:43.511Z",
             members:["4e8df0eb-6b1d-45a2-8272-0993de89334e","abcdefghijk2"],
             updatedAt: "2023-04-18T19:14:43.511Z",
             __v: 0
           }
         ];
         setMatches(backupMatches)
         console.log("LOOK AT MY MATCHES:")
         console.log(matches)
         console.log("DONE - LOOK AT MY MATCHES")
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
      try{
        const res = await axios.get("/Chat/"+currentChat?.id)
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