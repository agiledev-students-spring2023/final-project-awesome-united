import { useState } from "react"
import "./Match.css"
import axios from "axios"
import { useState, useEffect, useContext } from "react"


const Match = props => {


  //fetch name associated with user-id
  const [user,setUser] = useState(null)

  useEffect(()=>{
    // if element (id) in member not equals current logged in user id,
    //
    const otherId = props.match.member.find(m => m !== props.currentUserId)
    const getUser = async ()=>{
      const res = await axios("/users")
    } 
  },[])


  // this component expects to receive 'name', 'chatPreview', and 'handleClick' values passed as arguments to it
  // react automatically bundles these arguments into an object called props
  return (
    <article id="myDIV">
      <img className="profileImage" src={props.profileImg} onClick={props.handleImageClick} />
      <div className="chat" onClick={props.handleClick}>
          <div className="matchName">{props.name}</div>
          <div className="chatPrev">{props.chatPreview}</div>
      </div>
    </article>
  )
}

export default Match