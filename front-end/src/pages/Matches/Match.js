import { useState, useEffect } from "react"
import "./Match.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat"


const Match = props => {

  const jwtToken = localStorage.getItem("token"); // the JWT token, if we have already received one and stored it in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true); // if we already have a JWT token in local storage, set this to true, otherwise false
  const [accountInfo, setAccountInfo] = useState([]);

  
  const [otherUser,setOtherUser] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    // if element (id) in member not equals current logged in user id,
    // need this because for each match model, in the members section it includes the id of the match person themselves
    // and the current user's ID.
    const otherId = props.match.members.find(m => m !== props.currentUser.id)
    // actually get the data associated with that userId
    const getUser = async ()=>{
      let tmp = {userId: otherId}
      try{
        console.log("MATCH.JS try")
        console.log(tmp)
        const res = await axios.post("http://localhost:3001/get-User/", tmp)
        //const res = await axios("http://localhost:3001/User?userId="+otherId)
        setOtherUser( res.data )
        console.log(res)
      }catch(err){
        console.log(err)
      }
    };
    getUser()
  },[props.currentUser, props.match])

  //take user to matches' listing
  const handleImageClick = e => {
    let otherUserId = props.match.members.find(m => m !== props.currentUser.id)
    let path =  '/listing/' + otherUserId
    navigate(path);   
  }

  return (
    <>
    {/*do not render the page until react has finished retrieving the data of the other user */}
    {otherUser != null ? 
    <article id="myDIV">
      <img className="profilePhoto" 
        // otherUser.profilePhoto ? otherUser.profilePhoto : `${process.env.PUBLIC_URL}/no-profile-pic.webp`
        // `${process.env.PUBLIC_URL}/no-profile-pic.webp`
        src={ otherUser.profilePhoto ? otherUser.profilePhoto : `${process.env.PUBLIC_URL}/no-profile-pic.webp` } 
        onClick={handleImageClick} />
      <div className="chat">
          {/* for buyer POV, they will see the name of t*/}
          <div className="matchName">{ otherUser.firstName + " " + otherUser.lastName  }</div>
          {/* <div className="chatPrev">{props.chatPreview}</div> */}
      </div>
    </article>
    : ""}
    </>
  )
}

export default Match