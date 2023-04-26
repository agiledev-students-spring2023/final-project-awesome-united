import { useState, useEffect } from "react"
import "./Match.css"
import axios from "axios"

const Match = props => {

  const [otherUser,setOtherUser] = useState(null)

  useEffect(()=>{
    // if element (id) in member not equals current logged in user id,
    // need this because for each match model, in the members section it includes the id of the match person themselves
    // and the current user's ID.
    const otherId = props.match.members.find(m => m !== props.currentUser.id)
    // actually get the data associated with that userId
    const getUser = async ()=>{
      try{
        const res = await axios("/User?userId="+otherId)
        setOtherUser(res.data)
        console.log(res)
      }catch(err){
        console.log(err)
        // REMOVE WHEN DONE
        // essentially the user model but stripped down
        const backupMatch = [
          {
          id: otherId,
          userName: "LaMatrureña",
          firstName: "Jose",
          lastName: "Gomez",
          email: "jgomez@",
          profilePhoto: "${process.env.PUBLIC_URL}/no-profile-pic.webp"
          }
        ];
        setOtherUser(backupMatch)
        console.log("OVA HERE INGLAND")
        console.log(backupMatch)
      }
    };
    getUser()
  },[props.currentUser, props.match])

  return (
    <article id="myDIV">
      <img className="profilePhoto" 
      // otherUser.profilePhoto ? otherUser.profilePhoto : `${process.env.PUBLIC_URL}/no-profile-pic.webp`
      // `${process.env.PUBLIC_URL}/no-profile-pic.webp`
        src={ otherUser.profilePhoto ? otherUser.profilePhoto : `${process.env.PUBLIC_URL}/no-profile-pic.webp` } 
        onClick={props.handleImageClick} />
      <div className="chat" onClick={props.handleClick}>
          {/* for buyer POV, they will see the name of t*/}
          <div className="matchName">{ otherUser.firstName + " " + otherUser.lastName  }</div>
          {/* <div className="chatPrev">{props.chatPreview}</div> */}
      </div>
    </article>
  )
}

export default Match