import { useState, useEffect } from "react"
import "./Match.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat"


const Match = props => {

  const [otherUser,setOtherUser] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    // if element (id) in member not equals current logged in user id,
    // need this because for each match model, in the members section it includes the id of the match person themselves
    // and the current user's ID.
    const otherId = props.match.members.find(m => m !== props.currentUser.id)
    // actually get the data associated with that userId
    const getUser = async ()=>{
      try{
        console.log("MATCH.JS try")
        const res = await axios("/User?userId="+otherId)
        setOtherUser(res.data)
        console.log(res)
      }catch(err){
        console.log("MATCH.JS catch error")
        console.log(err)
        // REMOVE WHEN DONE
        // essentially the user model but stripped down
        const backupMatch = 
          {
          id: otherId,
          userName: "elapechao",
          firstName: "Jose",
          lastName: "Gomez",
          email: "jgomez@mail.pr",
          profilePhoto: null
          }
        ;
        setOtherUser(backupMatch)
        console.log("OVA HERE INGLAND")
        console.log(otherUser[0].firstName)
        console.log(backupMatch)
      }
    };
    getUser()
  },[props.currentUser, props.match])

  //take user to matches' listing
  const handleImageClick = e => {
    console.log("going to profile!")
    let path =  `/listing/1`
    //let path = `/listing/`+otherUser.id; 
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